import { UserRepository } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user.entity';
import UserModel from './user.model';
import { UserUpdateProps } from '../../domain/user/user.value';

export class MongoRepository implements UserRepository {
    async createUser(user: Partial<User>): Promise<User | null> {
        const newUser = new UserModel(user);
        const savedUser = await newUser.save();
        return savedUser.toObject();
    }

    async getUserById(userId: string): Promise<User | null> {
        const user = await UserModel.findOne({ userId: userId }).lean();
        return user || null;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email }).lean();
        return user || null;
    }

    async updateUser(
        userId: string,
        updatedData: UserUpdateProps,
    ): Promise<User> {
        const updatedUser = await UserModel.findOneAndUpdate(
            { userId: userId },
            { $set: updatedData },
            { new: true },
        ).lean();
        if (!updatedUser) {
            throw new Error(`User with userId ${userId} not found.`);
        }
        return updatedUser;
    }

    async deleteUser(userId: string): Promise<void> {
        try {
            await UserModel.findOneAndDelete({
                userId: userId,
            }).lean();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
}
