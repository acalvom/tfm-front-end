import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Class} from '../models/class.model';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private BASE_URL = 'http://localhost:8000';
  private CLASSES_CREATE = '/classes/create';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  createClass(newClass: Class) {
    const headers = this.authService.getHeaders();
    let url = this.BASE_URL + this.CLASSES_CREATE;
    return this.http.post(url, newClass, {headers, observe: 'response'});
  }

}
