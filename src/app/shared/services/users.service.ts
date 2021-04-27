import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BASE_URL = 'http://localhost:8000';
  private STUDENTS = '/users/students';
  private TEACHERS = '/users/teachers';


  constructor(private http: HttpClient) {
  }

  getStudents() {
    return this.http.get(this.BASE_URL + this.STUDENTS);
  }

  getTeachers() {
    return this.http.get(this.BASE_URL + this.TEACHERS);
  }
}
