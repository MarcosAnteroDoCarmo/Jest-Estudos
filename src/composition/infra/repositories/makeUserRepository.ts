import { UserRepository } from "../../../infra";


export const makeUserRepository = () => {
  return new UserRepository();
};
