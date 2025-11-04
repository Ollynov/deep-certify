-- Enable RLS on storage.objects table (if not already enabled)
-- This is required for Supabase Storage security

-- Allow authenticated users to upload files to the certifications bucket
CREATE POLICY "Allow authenticated users to upload files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'certifications');

-- Allow authenticated users to update their own files
CREATE POLICY "Allow authenticated users to update own files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'certifications' AND auth.uid()::text = owner);

-- Allow authenticated users to delete their own files
CREATE POLICY "Allow authenticated users to delete own files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'certifications' AND auth.uid()::text = owner);

-- Allow public read access to all files in certifications bucket
CREATE POLICY "Allow public read access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'certifications');
