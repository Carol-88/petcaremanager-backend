import { UserRepository } from '../../domain/user/user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET_KEY =
    process.env.JWT_SECRET_KEY || "didn't-find-secret-key-on-process-env";

export class LoginUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    public execute = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<string | null> => {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;
        const token = jwt.sign(
            { userId: user.userId, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' },
        );
        return token;
    };
}
