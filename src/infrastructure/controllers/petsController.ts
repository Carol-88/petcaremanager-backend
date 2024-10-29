import { uploadImage } from './../config/awsS3';
import { Request, Response } from 'express';

export const uploadPetImage = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const result = await uploadImage(req.file);
        res.status(200).json({
            message: 'Image uploaded successfully',
            result,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image', error });
    }
};
