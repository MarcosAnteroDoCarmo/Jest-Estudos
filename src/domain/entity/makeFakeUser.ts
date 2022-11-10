
import { makeFakeCreateUserDTO } from "./makeFakeCreateUserDTO";
import { User } from "./user";

export const makeFakeUser = () => {
  const dto = makeFakeCreateUserDTO();
  return new User(dto);
};
