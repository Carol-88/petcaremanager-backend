import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET_KEY =
    process.env.JWT_SECRET_KEY || "didn't-find-secret-key-on-process-env";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res
            .status(401)
            .json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: 'Invalid token.' });
        }

        next();
    });
};
