export class Reserve {
  id?: number;
  email_user: string;
  code_class: string;

  copyProperties(item) {
    this.id = item.id;
    this.email_user = item.email_user;
    this.code_class = item.code_class;
  }
}
