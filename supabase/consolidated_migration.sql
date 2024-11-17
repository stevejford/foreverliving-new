-- Create extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create memorials table
CREATE TABLE public.memorials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    birth_date DATE,
    death_date DATE,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.memorials ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Enable read access for all users"
    ON public.memorials FOR SELECT
    USING (true);

CREATE POLICY "Enable insert for authenticated users only"
    ON public.memorials FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for users based on user_id"
    ON public.memorials FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Enable delete for users based on user_id"
    ON public.memorials FOR DELETE
    USING (auth.uid() = user_id);

-- Create storage bucket for memorial images
INSERT INTO storage.buckets (id, name, public)
VALUES ('memorial-images', 'memorial-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Give users access to own folder"
    ON storage.objects FOR ALL
    USING (bucket_id = 'memorial-images' AND auth.role() = 'authenticated')
    WITH CHECK (bucket_id = 'memorial-images' AND auth.role() = 'authenticated');
