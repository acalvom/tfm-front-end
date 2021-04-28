export class User {
  id?: number;
  name: string;
  surname: string;
  dni: string;
  gender: string;
  email: string;
  password: string;
  penalties: number;
  role: string;
  token?: string;
  salt?: string;
}
