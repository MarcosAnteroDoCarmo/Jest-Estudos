import express from "express";
import { makeUserController } from "../../composition";

export const userRouter = express.Router();

const userController = makeUserController();

userRouter.post("/users", userController.createUser.bind(userController));

userRouter.get(
  "/users/:email",
  userController.findUniqueUser.bind(userController)
);
userRouter.get("/users", userController.listUser.bind(userController));

userRouter.put("/users/:email", userController.updateUser.bind(userController));

userRouter.delete(
  "/users/:email",
  userController.deleteUser.bind(userController)
);