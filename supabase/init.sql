-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create memorials table
CREATE TABLE IF NOT EXISTS memorials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    deceased_name TEXT NOT NULL,
    birth_date DATE,
    death_date DATE,
    cover_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create memories table (for stories/posts within memorials)
CREATE TABLE IF NOT EXISTS memories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    memorial_id UUID NOT NULL REFERENCES memorials(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    memory_id UUID NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create memorial_collaborators table
CREATE TABLE IF NOT EXISTS memorial_collaborators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    memorial_id UUID NOT NULL REFERENCES memorials(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'contributor', 'viewer')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(memorial_id, user_id)
);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE memorials ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE memorial_collaborators ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = user_id);

-- Create policies for memorials table
CREATE POLICY "Users can view memorials they created or collaborate on"
    ON memorials FOR SELECT
    USING (
        auth.uid() = user_id
        OR EXISTS (
            SELECT 1 FROM memorial_collaborators
            WHERE memorial_id = memorials.id
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create memorials"
    ON memorials FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Memorial owners can update their memorials"
    ON memorials FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Memorial owners can delete their memorials"
    ON memorials FOR DELETE
    USING (auth.uid() = user_id);

-- Create policies for memories table
CREATE POLICY "Users can view memories of memorials they have access to"
    ON memories FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM memorials m
            LEFT JOIN memorial_collaborators mc ON m.id = mc.memorial_id
            WHERE m.id = memories.memorial_id
            AND (m.user_id = auth.uid() OR mc.user_id = auth.uid())
        )
    );

CREATE POLICY "Users can create memories in memorials they have access to"
    ON memories FOR INSERT
    WITH CHECK (
        auth.uid() = user_id
        AND EXISTS (
            SELECT 1 FROM memorials m
            LEFT JOIN memorial_collaborators mc ON m.id = mc.memorial_id
            WHERE m.id = memorial_id
            AND (m.user_id = auth.uid() OR mc.user_id = auth.uid())
        )
    );

CREATE POLICY "Memory owners can update their memories"
    ON memories FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Memory owners can delete their memories"
    ON memories FOR DELETE
    USING (auth.uid() = user_id);

-- Create policies for comments table
CREATE POLICY "Users can view comments on memories they have access to"
    ON comments FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM memories mem
            JOIN memorials m ON mem.memorial_id = m.id
            LEFT JOIN memorial_collaborators mc ON m.id = mc.memorial_id
            WHERE mem.id = comments.memory_id
            AND (m.user_id = auth.uid() OR mc.user_id = auth.uid())
        )
    );

CREATE POLICY "Users can create comments on memories they have access to"
    ON comments FOR INSERT
    WITH CHECK (
        auth.uid() = user_id
        AND EXISTS (
            SELECT 1 FROM memories mem
            JOIN memorials m ON mem.memorial_id = m.id
            LEFT JOIN memorial_collaborators mc ON m.id = mc.memorial_id
            WHERE mem.id = memory_id
            AND (m.user_id = auth.uid() OR mc.user_id = auth.uid())
        )
    );

CREATE POLICY "Comment owners can update their comments"
    ON comments FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Comment owners can delete their comments"
    ON comments FOR DELETE
    USING (auth.uid() = user_id);

-- Create policies for memorial_collaborators table
CREATE POLICY "Memorial owners can manage collaborators"
    ON memorial_collaborators FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM memorials
            WHERE id = memorial_id
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view collaborators of memorials they have access to"
    ON memorial_collaborators FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM memorials m
            LEFT JOIN memorial_collaborators mc ON m.id = mc.memorial_id
            WHERE m.id = memorial_collaborators.memorial_id
            AND (m.user_id = auth.uid() OR mc.user_id = auth.uid())
        )
    );

-- Create function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_memorials_updated_at
    BEFORE UPDATE ON memorials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_memories_updated_at
    BEFORE UPDATE ON memories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_memorials_user_id ON memorials(user_id);
CREATE INDEX IF NOT EXISTS idx_memories_memorial_id ON memories(memorial_id);
CREATE INDEX IF NOT EXISTS idx_memories_user_id ON memories(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_memory_id ON comments(memory_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_memorial_collaborators_memorial_id ON memorial_collaborators(memorial_id);
CREATE INDEX IF NOT EXISTS idx_memorial_collaborators_user_id ON memorial_collaborators(user_id);
