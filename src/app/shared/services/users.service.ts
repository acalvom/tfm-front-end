import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {User} from '../models/user.model';

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
    const headers = this.authService.getHeaders();
    return this.http.get(this.BASE_URL + this.USERS, {headers, observe: 'response'});
  }

  getStudents() {
    const headers = this.authService.getHeaders();
    return this.http.get(this.BASE_URL + this.STUDENTS, {headers, observe: 'response'});
  }

  deleteUser(userEmail: string) {
    const headers = this.authService.getHeaders();
    const url = this.BASE_URL + this.USERS + '/' + userEmail;
    return this.http.delete(url, {headers, observe: 'response'});
  }

  editUser(userEmail: string, editedUser: User) {
    const headers = this.authService.getHeaders();
    const url = this.BASE_URL + this.USERS + '/' + userEmail;
    return this.http.put(url, editedUser, {headers, observe: 'response'});
  }
}
