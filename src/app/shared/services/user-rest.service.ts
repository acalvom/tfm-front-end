import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  private BASE_URL = 'http://localhost:8000';
  private USERS = '/users';

  constructor(private http: HttpClient) {
  }

  loginUser(email: string, password: string) {
    let url = this.BASE_URL + this.USERS + '/login?email=' + email + '&password=' + password;
    console.log(url);
    return this.http.get(url, {observe: 'response'});
  }
}
