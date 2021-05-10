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
    this.circuit = this.covertToBoolean(item.circuit);
    this.race = this.covertToBoolean(item.race);
    this.bar = this.covertToBoolean(item.bar);
    this.pullUps = this.covertToBoolean(item.pullUps);
    this.fitness = item.fitness;
    this.comments = item.comments;
    this.creationDate = item.creationDate;
  }

  covertToBoolean(value) {
    let boolValue = value;
    if (typeof boolValue === 'string') {
      boolValue = value.toLowerCase() == 'true';
    }
    return boolValue;
  }
}
