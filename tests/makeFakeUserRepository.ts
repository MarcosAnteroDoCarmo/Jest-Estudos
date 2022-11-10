import { faker } from "@faker-js/faker";
import { User as PrismaUser } from "@prisma/client";
import {
  CountUser,
  CreateUser,
  DeleteUser,
  FindUniqueUser,
  ListUser,
  UpdateUser,
  User,
} from "../src/domain";
import { makeFakeUser } from "../src/domain/entity/makeFakeUser";

export const makeFakeUserRepository = () => {
  const repository = {
    countUser: jest.fn<Promise<number>, [params: CountUser]>(),
    createUser: jest.fn<Promise<User>, [params: CreateUser]>(),
    deleteUser: jest.fn<Promise<User>, [params: DeleteUser]>(),
    findUniqueUser: jest.fn<Promise<User | void>, [params: FindUniqueUser]>(),
    listUser: jest.fn<Promise<User[]>, [params: ListUser]>(),
    updateUser: jest.fn<Promise<User>, [params: UpdateUser]>(),
    mapperPrismaUserToUser: jest.fn<User, [params: PrismaUser]>(),
  };

  const user = makeFakeUser();

  repository.countUser.mockResolvedValue(faker.datatype.number());
  repository.createUser.mockResolvedValue(user);
  repository.deleteUser.mockResolvedValue(user);
  repository.findUniqueUser.mockResolvedValue(user);
  repository.listUser.mockResolvedValue([user]);
  repository.updateUser.mockResolvedValue(user);

  return { repository, user };
};
