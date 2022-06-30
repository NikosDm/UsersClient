export enum Role {
  Admin = 1,
  Manager = 2,
  Editor = 3,
}

export interface User {
  UserID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  RoleID: number;
}

export interface LoginDTO {
  Email: string;
  Password: string;
}

export interface UserToken {
  UserID: number;
  Token: string;
}
