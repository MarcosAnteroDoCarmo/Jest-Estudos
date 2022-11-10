import { faker } from "@faker-js/faker";
import { ConstructUserDTO, makeFakeCreateUserDTO, User } from "../src/domain";
import {
  makeFakeUser,
} from "../src/domain/entity/makeFakeUser";
import { UserService } from "../src/application/service/userService";
import { makeFakeUserRepository } from "./makeFakeUserRepository";

const sutFactory = () => {
  const { repository, user } = makeFakeUserRepository();
  const sut = new UserService(repository);

  return { sut, repository, user };
};

describe("UserService Test", () => {
  let { sut, repository, user } = sutFactory();
  let dto: ConstructUserDTO;

  beforeEach(() => {
    dto = makeFakeCreateUserDTO();
  });

it("UserService should be defined", () => {
    expect(sut).toBeDefined();
  });

  describe("createUser", () => {
    it("createUser shouldn't create a User when a User with the same email already exists", async () => {
      const promise = sut.createUser(dto);

      expect(promise).rejects.toThrowError(
        new Error("This User already exists")
      );
    });

    it("createUser should create a User", async () => {
      repository.findUniqueUser.mockResolvedValueOnce();

      const user = await sut.createUser(dto);

      expect(user).toBeInstanceOf(User);
    });
  });

  describe("findUniqueUser", () => {
    it("findUniqueUser should return a User", async () => {
      const promise = await sut.findUniqueUser({ email: user.email });

      expect(promise).toBeInstanceOf(User);
    });

    it("findUniqueUser should return void", async () => {
      repository.findUniqueUser.mockResolvedValueOnce();

      const promise = await sut.findUniqueUser({ email: "fakeEmail" });

      expect(promise).toBeFalsy();
    });
  });

  describe("listUser", () => {
    it("listUser should return User[]", async () => {
      const promise = sut.listUser();

      expect(promise).toBeInstanceOf(Promise<User[]>);
    });

    it("listUser should return empty User[]", async () => {
      repository.listUser.mockResolvedValueOnce([]);

      const promise = sut.listUser();

      expect(promise).toBeInstanceOf(Promise<[]>);
    });
  });

  describe("updateUser", () => {
    it("updateUser should return User - no email change", async () => {
      const promise = await sut.updateUser([user, { email: user.email }]);

      expect(promise).toBeInstanceOf(User);
    });

    it("updateUser should return User - email change", async () => {
      repository.findUniqueUser
        .mockResolvedValueOnce(user)
        .mockResolvedValueOnce();

      const newUser = makeFakeUser();
      const email = { email: user.email };

      const promise = await sut.updateUser([newUser, email]);

      expect(promise).toBeInstanceOf(User);
    });

    it("updateUser shouldn't return User, failed to find user", async () => {
      repository.findUniqueUser.mockResolvedValueOnce();

      const promise = sut.updateUser([user, { email: user.email }]);

      expect(promise).rejects.toThrowError(
        new Error("This Email do not exist")
      );
    });

    it("updateUser shouldn't return User, invalid email", async () => {
      const newUser = makeFakeUser();

      repository.findUniqueUser
        .mockResolvedValueOnce(user)
        .mockResolvedValueOnce(newUser);

      const promise = sut.updateUser([newUser, { email: user.email }]);

      expect(promise).rejects.toThrowError(new Error("Email invalid"));
    });
  });

  describe("deleteUser", () => {
    it("deleteUser should return User equal email", async () => {
      const promise = await sut.deleteUser({ email: user.email });

      expect(promise).toBeInstanceOf(User);
    });

    it("deleteUser shouldn't return User, invalid email", async () => {
      repository.findUniqueUser.mockResolvedValueOnce();

      const email = faker.internet.email();

      const promise = sut.deleteUser({ email });

      expect(promise).rejects.toThrowError(
        new Error("This Email do not exist")
      );
    });
  });

  describe("countUser", () => {
    it("countUser should return a Number", async () => {
      const promise = await sut.countUser();

      expect(promise).toBe(Number(promise));
    });

    it("countUser should return the amount - 0 ", async () => {
      repository.countUser.mockResolvedValueOnce(0);

      const promise = await sut.countUser();

      expect(promise).toEqual(0);
    });
  });
});
