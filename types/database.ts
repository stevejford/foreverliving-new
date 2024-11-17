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

export type Database = {
  profiles: Profile;
  memorials: Memorial;
  memories: Memory;
  comments: Comment;
  memorial_collaborators: MemorialCollaborator;
};
