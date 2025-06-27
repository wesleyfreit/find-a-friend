import { env } from '@/env';
import { S3Client } from '@aws-sdk/client-s3';

export const client = new S3Client({
  region: env.BUCKET_REGION,
  endpoint: env.BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: env.BUCKET_ACCESS_KEY_ID,
    secretAccessKey: env.BUCKET_SECRET_ACCESS_KEY,
  },
});
