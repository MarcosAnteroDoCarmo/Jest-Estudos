import { faker } from "@faker-js/faker";

export const makeFakeCreateUserDTO = () => {
  return {
    userName: faker.name.firstName(),
    email: faker.internet.email(),
    birthDate: faker.date.birthdate(),
    address: faker.address.streetAddress(),
  };
};
