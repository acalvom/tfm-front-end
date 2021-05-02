import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BASE_URL = 'http://localhost:8000';
  private USERS = '/users';
  private STUDENTS = '/users/students';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getUsers() {
    const token = this.authService.getToken().split(',')[2];
    const role = this.authService.getToken().split(',')[1];
    const headers = new HttpHeaders().set('Authorization', token).set('Role', role);
    return this.http.get(this.BASE_URL + this.USERS, {headers, observe: 'response'});
  }

  getStudents() {
    const token = this.authService.getToken().split(',')[2];
    const role = this.authService.getToken().split(',')[1];
    const headers = new HttpHeaders().set('Authorization', token).set('Role', role);
    return this.http.get(this.BASE_URL + this.STUDENTS, {headers, observe: 'response'});
  }

  deleteUser(userEmail: string) {
    const token = this.authService.getToken().split(',')[2];
    const role = this.authService.getToken().split(',')[1];
    const headers = new HttpHeaders().set('Authorization', token).set('Role', role);
    const url = this.BASE_URL + this.USERS + '/' + userEmail;
    return this.http.delete(url, {headers, observe: 'response'});
  }
}
