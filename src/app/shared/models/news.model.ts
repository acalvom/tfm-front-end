export class News {
  id?: number;
  code: string;
  title: string;
  description: string;
  creation_date?: Date;

  copyProperties(item) {
    this.id = item.id;
    this.code = item.code;
    this.title = item.title;
    this.description = item.description;
    this.creation_date = item.creation_date;
  }

  dateToCode(date: Date) {
    return date.getDate().toString() + (date.getMonth() + 1).toString() + date.getFullYear().toString()
      + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();
  }
}
