import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import NoteForm from './NoteForm';
import NoteItem from './NoteItem';

interface Note {
  id: string;
  content: string;
  entity_type: 'candidate' | 'contact' | 'company' | 'job' | 'project';
  entity_id: string;
  priority: 'low' | 'medium' | 'high';
  tags?: string[];
  author_id: string;
  created_at: string;
  updated_at: string;
}

interface NotesPanelProps {
  entityType: 'candidate' | 'contact' | 'company' | 'job' | 'project';
  entityId: string;
  entityName: string;
}

const NotesPanel = ({ entityType, entityId, entityName }: NotesPanelProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const queryClient = useQueryClient();
  const { user } = useAuth();

  const fetchNotes = async (): Promise<Note[]> => {
    console.log('Fetching notes for:', { entityType, entityId });
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
    console.log('Notes fetched:', data);
    return data || [];
  };

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['notes', entityType, entityId],
    queryFn: fetchNotes
  });

  const addNoteMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!user) throw new Error('User not authenticated');

      console.log('Adding note:', { content, entityType, entityId, userId: user.id });
      const { data, error } = await supabase
        .from('notes')
        .insert({
          entity_type: entityType,
          entity_id: entityId,
          content,
          author_id: user.id
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding note:', error);
        throw error;
      }
      console.log('Note added successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', entityType, entityId] });
      setNewNote('');
      setIsAdding(false);
    },
    onError: (error) => {
      console.error('Add note mutation error:', error);
    }
  });

  const updateNoteMutation = useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }) => {
      console.log('Updating note:', { id, content });
      const { data, error } = await supabase
        .from('notes')
        .update({ content })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating note:', error);
        throw error;
      }
      console.log('Note updated successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', entityType, entityId] });
      setEditingId(null);
      setEditContent('');
    },
    onError: (error) => {
      console.error('Update note mutation error:', error);
    }
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting note:', id);
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting note:', error);
        throw error;
      }
      console.log('Note deleted successfully');
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', entityType, entityId] });
    },
    onError: (error) => {
      console.error('Delete note mutation error:', error);
    }
  });

  const handleAddNote = () => {
    if (newNote.trim()) {
      addNoteMutation.mutate(newNote.trim());
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const handleUpdateNote = () => {
    if (editContent.trim() && editingId) {
      updateNoteMutation.mutate({ id: editingId, content: editContent.trim() });
    }
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNoteMutation.mutate(id);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="text-center text-gray-500">
            Please log in to view and add notes.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Notes - {entityName}</CardTitle>
          <Button 
            size="sm" 
            onClick={() => setIsAdding(true)}
            disabled={isAdding}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Note
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {/* Add New Note */}
        {isAdding && (
          <NoteForm
            value={newNote}
            onChange={setNewNote}
            onSave={handleAddNote}
            onCancel={() => {
              setIsAdding(false);
              setNewNote('');
            }}
            isLoading={addNoteMutation.isPending}
          />
        )}

        {/* Notes List */}
        {isLoading ? (
          <div className="text-center py-4 text-gray-500">Loading notes...</div>
        ) : notes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-lg font-medium">No notes yet</div>
            <div className="text-sm">Add the first note to get started</div>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => (
              <div key={note.id}>
                {editingId === note.id ? (
                  <NoteForm
                    value={editContent}
                    onChange={setEditContent}
                    onSave={handleUpdateNote}
                    onCancel={() => {
                      setEditingId(null);
                      setEditContent('');
                    }}
                    isLoading={updateNoteMutation.isPending}
                    saveButtonText="Save"
                  />
                ) : (
                  <NoteItem
                    note={note}
                    onEdit={handleEditNote}
                    onDelete={handleDeleteNote}
                    isDeleting={deleteNoteMutation.isPending}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotesPanel;
