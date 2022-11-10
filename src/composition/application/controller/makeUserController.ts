import { UserController } from "../../../application";
import { makeUserService } from "../service";


export const makeUserController = () => {
  const service = makeUserService();
  return new UserController(service);
};
