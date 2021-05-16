export class Class {
  id?: number;
  code: string;
  day: Date;
  init_hour: Date;
  end_hour: Date;
  max_places: number;
  current_places: number;
  location: string;
  id_workout: number;

  copyProperties(item) {
    this.id = item.id;
    this.code = item.code;
    this.day = item.day;
    this.init_hour = item.init_hour;
    this.end_hour = item.end_hour;
    this.max_places = item.max_places;
    this.current_places = item.current_places;
    this.location = item.location;
    this.id_workout = item.id_workout;
  }
}
