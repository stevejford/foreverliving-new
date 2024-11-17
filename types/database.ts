export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Profile = {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Memorial = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  deceased_name: string;
  birth_date: string | null;
  death_date: string | null;
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Memory = {
  id: string;
  memorial_id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: string;
  memory_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type MemorialCollaborator = {
  id: string;
  memorial_id: string;
  user_id: string;
  role: 'admin' | 'contributor' | 'viewer';
  created_at: string;
};

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile>;
        Update: Partial<Profile>;
      };
      memorials: {
        Row: Memorial;
        Insert: Partial<Memorial>;
        Update: Partial<Memorial>;
      };
      memories: {
        Row: Memory;
        Insert: Partial<Memory>;
        Update: Partial<Memory>;
      };
      comments: {
        Row: Comment;
        Insert: Partial<Comment>;
        Update: Partial<Comment>;
      };
      memorial_collaborators: {
        Row: MemorialCollaborator;
        Insert: Partial<MemorialCollaborator>;
        Update: Partial<MemorialCollaborator>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      collaborator_role: 'admin' | 'contributor' | 'viewer';
    };
  };
}
