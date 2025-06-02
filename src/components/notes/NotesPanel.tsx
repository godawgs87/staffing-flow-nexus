
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, User, Calendar } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Note {
  id: string;
  content: string;
  entityType: 'candidate' | 'contact' | 'company' | 'job' | 'project';
  entityId: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  tags?: string[];
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

  // Mock notes data - replace with actual Supabase queries
  const fetchNotes = async (): Promise<Note[]> => {
    // Simulated notes
    return [
      {
        id: '1',
        content: 'Initial interview went well. Strong technical skills, good communication.',
        entityType,
        entityId,
        createdAt: '2024-06-01T10:00:00Z',
        updatedAt: '2024-06-01T10:00:00Z',
        author: 'John Doe',
        tags: ['interview', 'technical']
      },
      {
        id: '2',
        content: 'Follow up needed on salary expectations. Client budget is $120k-140k.',
        entityType,
        entityId,
        createdAt: '2024-06-02T14:30:00Z',
        updatedAt: '2024-06-02T14:30:00Z',
        author: 'Jane Smith',
        tags: ['salary', 'negotiation']
      }
    ];
  };

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['notes', entityType, entityId],
    queryFn: fetchNotes
  });

  const addNoteMutation = useMutation({
    mutationFn: async (content: string) => {
      // Mock API call - replace with Supabase
      console.log('Adding note:', content);
      return { id: Date.now().toString(), content };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', entityType, entityId] });
      setNewNote('');
      setIsAdding(false);
    }
  });

  const updateNoteMutation = useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }) => {
      // Mock API call - replace with Supabase
      console.log('Updating note:', id, content);
      return { id, content };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', entityType, entityId] });
      setEditingId(null);
      setEditContent('');
    }
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Mock API call - replace with Supabase
      console.log('Deleting note:', id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', entityType, entityId] });
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
      <CardContent className="space-y-4">
        {/* Add New Note */}
        {isAdding && (
          <div className="space-y-2 p-4 border rounded-lg bg-gray-50">
            <Textarea
              placeholder="Add your note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-20"
            />
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                onClick={handleAddNote}
                disabled={!newNote.trim() || addNoteMutation.isPending}
              >
                Save Note
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => {
                  setIsAdding(false);
                  setNewNote('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
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
              <div key={note.id} className="border rounded-lg p-4">
                {editingId === note.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-20"
                    />
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={handleUpdateNote}
                        disabled={!editContent.trim() || updateNoteMutation.isPending}
                      >
                        Save
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => {
                          setEditingId(null);
                          setEditContent('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span>{note.author}</span>
                        <Calendar className="h-4 w-4 ml-2" />
                        <span>{formatDate(note.createdAt)}</span>
                      </div>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleEditNote(note)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleDeleteNote(note.id)}
                          disabled={deleteNoteMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-gray-900 mb-2">{note.content}</div>
                    {note.tags && note.tags.length > 0 && (
                      <div className="flex space-x-1">
                        {note.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </>
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
