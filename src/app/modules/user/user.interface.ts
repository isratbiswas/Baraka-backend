export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}
