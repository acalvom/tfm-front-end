import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Workout} from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  private BASE_URL = 'http://localhost:8000';
  private WORKOUTS_CREATE = '/workouts/create';
  private WORKOUTS = '/workouts';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getWorkouts() {
    const headers = this.authService.getHeaders();
    return this.http.get(this.BASE_URL + this.WORKOUTS, {headers, observe: 'response'});
  }

  getWorkout(id: number) {
    const headers = this.authService.getHeaders();
    const url = this.BASE_URL + this.WORKOUTS + '/' + id;
    return this.http.get(url, {headers, observe: 'response'});
  }

  createWorkout(workout: Workout) {
    const headers = this.authService.getHeaders();
    let url = this.BASE_URL + this.WORKOUTS_CREATE;
    return this.http.post(url, workout, {headers, observe: 'response'});
  }

  deleteWorkout(id: number) {
    const headers = this.authService.getHeaders();
    const url = this.BASE_URL + this.WORKOUTS + '/' + id;
    return this.http.delete(url, {headers, observe: 'response'});
  }

  editWorkout(id: number, editedWorkout: Workout) {
    const headers = this.authService.getHeaders();
    const url = this.BASE_URL + this.WORKOUTS + '/' + id;
    return this.http.put(url, editedWorkout, {headers, observe: 'response'});
  }

}
