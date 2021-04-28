import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BASE_URL = 'http://localhost:8000';
  private STUDENTS = '/users/students';
  private TEACHERS = '/users/teachers';


  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getStudents() {
    const token = this.authService.getToken().split(',')[2];
    const role = this.authService.getToken().split(',')[1];
    const headers = new HttpHeaders().set('Authorization', token).set('Role', role);
    return this.http.get(this.BASE_URL + this.STUDENTS, {headers, observe: 'response'});
  }

  getTeachers() {
    const token = this.authService.getToken().split(',')[2];
    const role = this.authService.getToken().split(',')[1];
    const headers = new HttpHeaders().set('Authorization', token).set('Role', role);
    return this.http.get(this.BASE_URL + this.TEACHERS, {headers, observe: 'response'});
  }
}
