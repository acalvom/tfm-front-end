import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  private BASE_URL = 'http://localhost:8000';
  private USERS = '/users';
  private LOGIN = '/login';

  constructor(private http: HttpClient) {
  }

  loginUser(userCredentials: object) {
    let url = this.BASE_URL + this.USERS + this.LOGIN;
    console.log(url);
    return this.http.post(url, userCredentials, {observe: 'response'}); // need to add a observe response for the token
  }

  setToken(email: string, token: string) {
    let tokenInfo: string[] = [email, token];
    sessionStorage.setItem('token', String(tokenInfo));
  }
}
