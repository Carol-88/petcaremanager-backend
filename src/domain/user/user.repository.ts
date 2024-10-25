import { User } from './user.entity';
import { UserUpdateProps } from './user.value';

export interface UserRepository {
    createUser(user: User): Promise<User | null>;
    getUserById(userId: string): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    updateUser(userId: string, updatedData: UserUpdateProps): Promise<User>;
    deleteUser(userId: string): Promise<void>;
}
