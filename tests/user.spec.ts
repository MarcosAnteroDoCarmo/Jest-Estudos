import { ConstructUserDTO, User } from "../src/domain/entity/user";
import { faker } from "@faker-js/faker";

describe("User entity", () => {
  let sut: User;
  let dto: ConstructUserDTO;

  beforeEach(() => {
    dto = {
      userName: faker.name.firstName(),
      email: faker.internet.email(),
      birthDate: faker.date.birthdate(),
    };
    sut = new User(dto);
  });

  it("should be defined", () => {
    expect(sut).toBeDefined();
  });

  it("should get correctly", () => {
    expect(sut.userName).toEqual(dto.userName);
    expect(sut.email).toEqual(dto.email);
    expect(sut.birthDate).toEqual(dto.birthDate);
  });

  it("should set correctly", () => {
    dto.userName = "otherUserName";
    dto.email = "other@email.com";
    dto.birthDate = new Date(0);

    sut.userName = dto.userName;
    sut.email = dto.email;
    sut.birthDate = dto.birthDate;

    expect(sut.userName).toEqual(dto.userName);
    expect(sut.email).toEqual(dto.email);
    expect(sut.birthDate).toEqual(dto.birthDate);
  });

  describe("Check for legal age", () => {
    it("should return true when user age is greater than 18", () => {
      sut.birthDate = new Date(0);

      expect(sut.isOfLegalAge()).toEqual(true);
    });

    it("should return false when user age is less than 18", () => {
      sut.birthDate = new Date();

      expect(sut.isOfLegalAge()).toEqual(false);
    });
  });
});
