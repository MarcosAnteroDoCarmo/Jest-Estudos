export type ConstructUserDTO = {
  userName: string;
  email: string;
  birthDate: Date;
  address?: string;
};

export class User {
  userName: string;
  email: string;
  birthDate: Date;
  address?: string

  constructor(params: ConstructUserDTO) {
    this.userName = params.userName;
    this.email = params.email;
    this.birthDate = params.birthDate;
    this.address = params.address;
  }

  isOfLegalAge() {
    return this.birthDate.getFullYear() < new Date().getFullYear() - 18;
  }
}
