import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:8000';
  private USERS = '/users';
  private LOGIN = '/login';
  private REGISTER = '/register';

  constructor(private http: HttpClient) {
  }

  loginUser(userCredentials: object) {
    let url = this.BASE_URL + this.USERS + this.LOGIN;
    return this.http.post(url, userCredentials, {observe: 'response'});
  }

  logoutUser(): void {
    this.deleteToken();
  }

  registerUser(user: User) {
    const token = this.getToken().split(',')[2];
    const role = this.getToken().split(',')[1];
    const headers = new HttpHeaders().set('Authorization', token).set('Role', role);
    let url = this.BASE_URL + this.USERS + this.REGISTER;
    return this.http.post(url, user, {headers, observe: 'response'});
  }

  setToken(email: string, role: string, token: string) {
    let tokenInfo: string[] = [email, role, token];
    sessionStorage.setItem('token', String(tokenInfo));
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  deleteToken() {
    sessionStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() != null;
  }

  isAdmin(): boolean {
    return (this.isAuthenticated()) && (this.getToken().split(',')[1] == 'admin');
  }

  isTeacher(): boolean {
    return (this.isAuthenticated()) && (this.getToken().split(',')[1] == 'teacher');
  }

  isStudent(): boolean {
    return (this.isAuthenticated()) && (this.getToken().split(',')[1] == 'student');
  }

  // // This is only to validate token verification
  // validToken(email: string, token: string) {
  //   const headers = new HttpHeaders().set('Authorization', token);
  //   return this.http.get(this.BASE_URL + '/users/valToken/' + email, {headers});
  // }
}
