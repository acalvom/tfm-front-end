export class StudentBasic {
  name: string;
  surname: string;
  email: string;
  penalties?: number;

  copyProperties(item) {
    this.name = item.name;
    this.surname = item.surname;
    this.email = item.email;
    this.penalties = item.penalties;
  }
}
