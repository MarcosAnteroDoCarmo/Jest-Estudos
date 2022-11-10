import { User } from "../entity";

export type CreateUser = User;
export type FindUniqueUser = { email: string };
export type ListUser = void;
export type UpdateUser = [User, { email: string }];
export type DeleteUser = { email: string };
export type CountUser = ListUser;

export interface IUserRepository {
  createUser: (params: CreateUser) => Promise<User>;
  findUniqueUser: (params: FindUniqueUser) => Promise<User | void>;
  listUser: (params: ListUser) => Promise<User[]>;
  updateUser: (params: UpdateUser) => Promise<User>;
  deleteUser: (params: DeleteUser) => Promise<User>;
  countUser: (params: CountUser) => Promise<number>;
}
