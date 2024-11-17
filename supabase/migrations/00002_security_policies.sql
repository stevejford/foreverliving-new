-- Migration: 00002_security_policies
-- Description: Set up Row Level Security policies
-- Created at: 2024-03-16

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE memorials ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE memorial_collaborators ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid()::text = user_id);

-- Create policies for memorials table
CREATE POLICY "Users can view memorials they created or collaborate on"
    ON memorials FOR SELECT
    USING (
        auth.uid()::text = user_id
        OR EXISTS (
            SELECT 1 FROM memorial_collaborators
            WHERE memorial_id = memorials.id
            AND user_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can create memorials"
    ON memorials FOR INSERT
    WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Memorial owners can update their memorials"
    ON memorials FOR UPDATE
    USING (auth.uid()::text = user_id);

CREATE POLICY "Memorial owners can delete their memorials"
    ON memorials FOR DELETE
    USING (auth.uid()::text = user_id);

-- Create policies for memories table
CREATE POLICY "Users can view memories of memorials they have access to"
    ON memories FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM memorials m
            LEFT JOIN memorial_collaborators mc ON m.id = mc.memorial_id
            WHERE m.id = memories.memorial_id
            AND (m.user_id = auth.uid()::text OR mc.user_id = auth.uid()::text)
        )
    );

CREATE POLICY "Users can create memories in memorials they have access to"
    ON memories FOR INSERT
    WITH CHECK (
        auth.uid()::text = user_id
        AND EXISTS (
            SELECT 1 FROM memorials m
            LEFT JOIN memorial_collaborators mc ON m.id = mc.memorial_id
            WHERE m.id = memorial_id
            AND (m.user_id = auth.uid()::text OR mc.user_id = auth.uid()::text)
        )
    );

CREATE POLICY "Memory owners can update their memories"
    ON memories FOR UPDATE
    USING (auth.uid()::text = user_id);

CREATE POLICY "Memory owners can delete their memories"
    ON memories FOR DELETE
    USING (auth.uid()::text = user_id);

-- Create policies for comments table
CREATE POLICY "Users can view comments on memories they have access to"
    ON comments FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM memories mem
            JOIN memorials m ON mem.memorial_id = m.id
            LEFT JOIN memorial_collaborators mc ON m.id = mc.memorial_id
            WHERE mem.id = comments.memory_id
            AND (m.user_id = auth.uid()::text OR mc.user_id = auth.uid()::text)
        )
    );

CREATE POLICY "Users can create comments on memories they have access to"
    ON comments FOR INSERT
    WITH CHECK (
        auth.uid()::text = user_id
        AND EXISTS (
            SELECT 1 FROM memories mem
            JOIN memorials m ON mem.memorial_id = m.id
            LEFT JOIN memorial_collaborators mc ON m.id = mc.memorial_id
            WHERE mem.id = memory_id
            AND (m.user_id = auth.uid()::text OR mc.user_id = auth.uid()::text)
        )
    );

CREATE POLICY "Comment owners can update their comments"
    ON comments FOR UPDATE
    USING (auth.uid()::text = user_id);

CREATE POLICY "Comment owners can delete their comments"
    ON comments FOR DELETE
    USING (auth.uid()::text = user_id);

-- Create policies for memorial_collaborators table
CREATE POLICY "Memorial owners can manage collaborators"
    ON memorial_collaborators FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM memorials
            WHERE id = memorial_id
            AND user_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can view collaborators of memorials they have access to"
    ON memorial_collaborators FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM memorials m
            LEFT JOIN memorial_collaborators mc ON m.id = mc.memorial_id
            WHERE m.id = memorial_collaborators.memorial_id
            AND (m.user_id = auth.uid()::text OR mc.user_id = auth.uid()::text)
        )
    );

-- Record this migration
INSERT INTO schema_migrations (version) VALUES ('00002_security_policies');
