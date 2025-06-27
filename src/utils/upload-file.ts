import { env } from '@/env';
import { client } from '@/lib/aws';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const mountUploadFileUrl = async (filePath: string) => {
  const signedUrl = await getSignedUrl(
    client,
    new PutObjectCommand({
      Bucket: env.BUCKET_NAME,
      Key: filePath,
    }),
    {
      expiresIn: 60, // 1min
    },
  );

  return {
    signedUrl,
  };
};
