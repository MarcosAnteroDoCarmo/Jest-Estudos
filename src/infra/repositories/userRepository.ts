import {
  CountUser,
  CreateUser,
  DeleteUser,
  FindUniqueUser,
  IUserRepository,
  ListUser,
  UpdateUser,
  User,
} from "../../domain";
import { User as PrismaUser } from "@prisma/client";
import { prismaClient } from "../data";

export class UserRepository implements IUserRepository {
  constructor() {}

  async createUser(params: CreateUser): Promise<User> {
    if (!params) {
      throw new Error("I need a User for this");
    }

    const user = await prismaClient.user.create({
      data: {
        userName: params.userName,
        email: params.email,
        address: params.address,
        birthDate: params.birthDate,
      },
    });

    return this.mapperPrismaUserToUser(user);
  }

  async findUniqueUser(params: FindUniqueUser): Promise<User | void> {
    const user = await prismaClient.user.findUnique({
      where: { email: params.email },
    });

    if (!user) {
      return;
    }

    return this.mapperPrismaUserToUser(user);
  }

  async listUser(params: ListUser): Promise<User[]> {
    const users = await prismaClient.user.findMany({});

    if (!users) throw new Error("User not found");

    return users.map(this.mapperPrismaUserToUser);
  }

  async updateUser(params: UpdateUser): Promise<User> {
    const userParams = params[0];
    const { email } = params[1];

    const user = await prismaClient.user.update({
      where: { email },
      data: {
        userName: userParams.userName,
        email: userParams.email,
        address: userParams.address,
        birthDate: new Date(userParams.birthDate),
      },
    });

    return this.mapperPrismaUserToUser(user);
  }

  async deleteUser(params: DeleteUser): Promise<User> {
    if (!params.email) {
      throw new Error("i need a email for this");
    }
    const user = await prismaClient.user.delete({
      where: { email: params.email },
    });

    if (!user) {
      throw new Error("i need a user for this");
    }

    return this.mapperPrismaUserToUser(user);
  }

  async countUser(params: CountUser): Promise<number> {
    const amount = await prismaClient.user.count();

    return amount;
  }

  mapperPrismaUserToUser(params: PrismaUser): User {
    return new User({
      userName: params.userName,
      email: params.email,
      address: params.address ?? undefined,
      birthDate: params.birthDate,
    });
  }
}
