import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'ap-southeast-2',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  },
  forcePathStyle: true, // Required for Supabase S3-compatible storage
});

export const uploadToS3 = async (
  file: Buffer | Blob,
  fileName: string,
  contentType: string
): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: "memorials", // Use the bucket name you created in Supabase
    Key: fileName,
    Body: file,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);
    // Construct the URL using the Supabase storage URL format
    return `${process.env.S3_ENDPOINT}/object/public/memorials/${fileName}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};

export default s3Client;
