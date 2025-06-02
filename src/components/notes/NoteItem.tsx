
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, User, Calendar } from 'lucide-react';

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

interface NoteItemProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const NoteItem = ({ note, onEdit, onDelete, isDeleting }: NoteItemProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }) + ' today';
    } else if (diffInHours < 48) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }) + ' yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
  };

  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span className="font-medium">User</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span className="font-medium">{formatDate(note.created_at)}</span>
          </div>
          {note.updated_at !== note.created_at && (
            <span className="text-xs text-gray-400">
              (edited {formatDate(note.updated_at)})
            </span>
          )}
        </div>
        <div className="flex space-x-1">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => onEdit(note)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => onDelete(note.id)}
            disabled={isDeleting}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="text-gray-900 mb-3 leading-relaxed">{note.content}</div>
      {note.tags && note.tags.length > 0 && (
        <div className="flex space-x-1 flex-wrap">
          {note.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteItem;
