import { Request, Response } from "express";
import { UserService } from "../service";

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request, res: Response) {
    try {
      const { userName, email, birthDate, address } = req.body;

      if (!userName) {
        throw new Error("I need the UserName for this");
      }

      if (!email) {
        throw new Error("I need the Email for this");
      }

      if (!birthDate) {
        throw new Error("I need the BirthDate for this");
      }

      if (!address) {
        throw new Error("I need the Address for this");
      }

      const user = await this.userService.createUser(req.body);

      return res.send({ user, message: "New User created" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        return res.status(400).send(err.message);
      }

      return res.status(500).send("Server Error");
    }
  }

  async findUniqueUser(req: Request, res: Response) {
    try {
      const { email } = req.params;

      const user = await this.userService.findUniqueUser({ email });

      if (!user) {
        return res.send({ message: "User not found" });
      }

      return res.send(user);
    } catch {
      return res.status(400).send({ message: "Error reading User" });
    }
  }

  async listUser(req: Request, res: Response) {
    try {
      const users = await this.userService.listUser();

      const amount = await this.userService.countUser();

      return res.send({ amount, users });
    } catch {
      return res.status(400).send({ message: "Error reading Users" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const data = req.body;

      if (!data.userName) {
        throw new Error("I need UserName for this");
      }

      if (!data.email) {
        throw new Error("I need Email for this");
      }

      if (!data.birthDate) {
        throw new Error("I need BirthDate for this");
      }

      const user = await this.userService.updateUser([data, { email }]);

      return res.send({ email, user });
    } catch (err: unknown) {
      if (err instanceof Error) return res.status(400).send(err.message);
      return res.status(500).send("Error Updating user");
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { email } = req.params;

      if (!email) {
        throw new Error("I need Email for this");
      }

      await this.userService.deleteUser({ email });

      return res.send({ message: "User deleted" });
    } catch (err: unknown) {
      if (err instanceof Error) return res.status(400).send(err.message);
      return res.status(500).send("Error deleting user");
    }
  }
}
