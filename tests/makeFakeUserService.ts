import { UserService } from "../src/application/service/userService";
import { makeFakeUserRepository } from "./makeFakeUserRepository";

export const makeFakeUserService = () => {
  const { repository, user } = makeFakeUserRepository();
  
  const service = new UserService(repository)
  
  return {service,repository, user};
};
