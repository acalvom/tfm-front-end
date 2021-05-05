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
  phone?: string;

  copyProperties(item) {
    this.name = item.name;
    this.surname = item.surname;
    this.dni = item.dni;
    this.gender = item.gender;
    this.email = item.email;
    this.penalties = item.penalties;
    this.role = item.role;
  }
}
