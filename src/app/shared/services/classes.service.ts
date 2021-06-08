import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Class} from '../models/class.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private BASE_URL = environment.BASE_URL;
  private CLASSES_CREATE = '/classes/create';
  private CLASSES = '/classes';
  private CLASSES_PLACES = '/classes/places';


  constructor(private http: HttpClient, private authService: AuthService) {
  }

  createClass(newClass: Class) {
    const headers = this.authService.getHeaders();
    let url = this.BASE_URL + this.CLASSES_CREATE;
    return this.http.post(url, newClass, {headers, observe: 'response'});
  }

  getClasses() {
    const headers = this.authService.getHeaders();
    return this.http.get(this.BASE_URL + this.CLASSES, {headers, observe: 'response'});
  }

  deleteClass(code: string) {
    const headers = this.authService.getHeaders();
    const url = this.BASE_URL + this.CLASSES + '/' + code;
    return this.http.delete(url, {headers, observe: 'response'});
  }

  editClass(code: string, editedClass: Class) {
    const headers = this.authService.getHeaders();
    const url = this.BASE_URL + this.CLASSES + '/' + code;
    return this.http.put(url, editedClass, {headers, observe: 'response'});
  }

  updateClassPlaces(code: string, value: number) {
    const headers = this.authService.getHeaders();
    const url = this.BASE_URL + this.CLASSES_PLACES + '/' + code;
    return this.http.put(url, {value}, {headers, observe: 'response'});
  }

}
