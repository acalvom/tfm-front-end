export class News {
  id?: number;
  title: string;
  description: string;
  creation_date?: Date;

  copyProperties(item) {
    this.id = item.id;
    this.title = item.title;
    this.description = item.description;
    this.creation_date = item.creation_date;
  }
}
