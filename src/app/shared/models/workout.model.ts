export class Workout {
  id?: number;
  title: string;
  description: string;
  circuit: boolean;
  race: boolean;
  bar: boolean;
  pullUps: boolean;
  fitness?: string;
  comments?: string;
  creationDate?: Date;

  copyProperties(item) {
    this.title = item.title;
    this.description = item.description;
    this.circuit = item.circuit;
    this.race = item.race;
    this.bar = item.bar;
    this.pullUps = item.pullUps;
    this.fitness = item.fitness;
    this.comments = item.comments;
    this.creationDate = item.creationDate;
  }
}
