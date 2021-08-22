import { User } from '../../server/user/user.schema';

export type RegisterResponse = Omit<User, 'password'>;
