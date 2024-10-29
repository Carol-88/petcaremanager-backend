import express from 'express';
import { uploadPetImage } from './../controllers/petsController';
const router = express.Router();
import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(), // Para guardar en memoria temporal antes de enviar a S3
});

router.post('/upload', upload.single('file'), uploadPetImage);

export default router;
