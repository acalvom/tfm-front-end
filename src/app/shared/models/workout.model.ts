export class Workout {
  id?: number;
  title: string;
  description: string;
  circuit: boolean;
  race: boolean;
  bar: boolean;
  pullups: boolean;
  fitness?: string;
  comments?: string;
  creationdate?: Date;

  copyProperties(item) {
    this.id = item.id;
    this.title = item.title;
    this.description = item.description;
    this.circuit = this.covertToBoolean(item.circuit);
    this.race = this.covertToBoolean(item.race);
    this.bar = this.covertToBoolean(item.bar);
    this.pullups = this.covertToBoolean(item.pullups);
    this.fitness = item.fitness;
    this.comments = item.comments;
    this.creationdate = item.creationdate;
  }

  covertToBoolean(value) {
    let boolValue = value;
    if (typeof boolValue === 'string') {
      boolValue = value.toLowerCase() == 'true';
    }
    return boolValue;
  }
}
