import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Reserve} from '../models/reserve.model';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservesService {

  private BASE_URL = 'http://localhost:8000';
  private RESERVES_CREATE = '/reserves/create';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  createReserve(reserve: Reserve) {
    const headers = this.authService.getHeaders();
    let url = this.BASE_URL + this.RESERVES_CREATE;
    // In progress
    return of(reserve);
    //return this.http.post(url, reserve, {headers, observe: 'response'});
  }
}
