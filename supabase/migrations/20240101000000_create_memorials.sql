-- Migration: 20240101000000_create_memorials
-- Description: Additional memorial-specific features and storage setup
-- Created at: 2024-01-01

-- Create storage bucket if it doesn't exist
DO $$
BEGIN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('memorials', 'memorials', true)
    ON CONFLICT (id) DO NOTHING;
END $$;

-- Storage policies (only create if they don't exist)
DO $$
BEGIN
    -- Try to create "Public Access" policy
    BEGIN
        CREATE POLICY "Public Access"
            ON storage.objects FOR SELECT
            USING (bucket_id = 'memorials');
    EXCEPTION
        WHEN duplicate_object THEN
            NULL;
    END;

    -- Try to create "Authenticated users can upload" policy
    BEGIN
        CREATE POLICY "Authenticated users can upload"
            ON storage.objects FOR INSERT
            WITH CHECK (
                bucket_id = 'memorials' 
                AND get_current_user_id() IS NOT NULL
            );
    EXCEPTION
        WHEN duplicate_object THEN
            NULL;
    END;
END $$;
