import {
  ConstructUserDTO,
  CountUser,
  DeleteUser,
  FindUniqueUser,
  IUserRepository,
  ListUser,
  UpdateUser,
  User,
} from "../../domain";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(params: ConstructUserDTO): Promise<User> {
    const userFound = await this.userRepository.findUniqueUser({
      email: params.email,
    });

    if (userFound) {
      throw new Error("This User already exists");
    }

    const user = new User({
      userName: params.userName,
      email: params.email,
      address: params.address,
      birthDate: new Date(params.birthDate),
    });
    return await this.userRepository.createUser(user);
  }

  async findUniqueUser(params: FindUniqueUser): Promise<User | void> {
    const user = await this.userRepository.findUniqueUser(params);
    return user;
  }

  async listUser(params: ListUser): Promise<User[]> {
    const users = await this.userRepository.listUser(params);
    return users;
  }

  async updateUser(params: UpdateUser): Promise<User> {
    const email = params[1].email;
    const data = params[0];

    if (!(await this.userRepository.findUniqueUser({ email }))) {
      throw new Error("This Email do not exist");
    }

    if (email !== data.email) {
      if (
        await this.userRepository.findUniqueUser({
          email: data.email,
        })
      ) {
        throw new Error("Email invalid");
      }
    }

    const user = await this.userRepository.updateUser(params);
    return user;
  }

  async deleteUser(params: DeleteUser): Promise<User> {
    if (!(await this.userRepository.findUniqueUser(params))) {
      throw new Error("This Email do not exist");
    }

    const user = await this.userRepository.deleteUser(params);
    return user;
  }

  async countUser(params: CountUser): Promise<number> {
    const amount = await this.userRepository.countUser(params);
    return amount;
  }
}
