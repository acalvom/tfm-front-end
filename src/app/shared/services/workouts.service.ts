import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Workout} from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  private BASE_URL = 'http://localhost:8000';
  private WORKOUTS = '/workouts/create';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  createWorkout(workout: Workout) {
    const headers = this.authService.getHeaders();
    let url = this.BASE_URL + this.WORKOUTS;
    return this.http.post(url, workout, {headers, observe: 'response'});
  }

}
