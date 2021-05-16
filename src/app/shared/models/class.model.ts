export class Class {
  id?: number;
  code: string;
  init_day_hour: Date;
  end_day_hour: Date;
  max_places: number;
  current_places: number;
  location: string;
  location_details?: string;
  id_workout: number;

  copyProperties(item) {
    this.id = item.id;
    this.code = item.code;
    this.init_day_hour = item.init_day_hour;
    this.end_day_hour = item.end_day_hour;
    this.max_places = item.max_places;
    this.current_places = item.current_places;
    this.location = item.location;
    this.location_details = item.location_details;
    this.id_workout = item.id_workout;
  }
}
