import { Request, Response } from "express";
import { UserController } from "../src/application/index";
import { makeFakeUserService } from "./makeFakeUserService";
import request from "supertest";

const sutFactory = () => {
  const { service, repository, user } = makeFakeUserService();
  const sut = new UserController(service);
  return { sut, service, repository, user };
};

describe("UserController", () => {
  let { sut, service, repository, user } = sutFactory();
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      body: {
        userName: "nameTest",
        email: "email@test.com",
        birthDate: "1970/01/01",
        address: "addresTest",
      },
    } as Request;

    const send = () => {};
    const status = () => ({ send });
    res = { send, status } as unknown as Response;
  });

  it("UserController should be defined", () => {
    expect(sut).toBeDefined();
  });

});
