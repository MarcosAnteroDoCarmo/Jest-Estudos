import { UserService } from "../../../application";
import { makeUserRepository } from "../../infra";


export const makeUserService = () => {
  const repository = makeUserRepository();
  return new UserService(repository);
};
