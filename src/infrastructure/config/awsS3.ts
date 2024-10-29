import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadImage = async (file: Express.Multer.File) => {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `images/${file.originalname}`, // Carpeta y nombre del archivo en S3
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    const response = await s3.send(command);
    return response;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};

