import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Reserve} from '../models/reserve.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservesService {

  private BASE_URL = environment.BASE_URL;
  private RESERVES_CREATE = '/reserves/create';
  private RESERVES = '/reserves';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  createReserve(reserve: Reserve) {
    const headers = this.authService.getHeaders();
    let url = this.BASE_URL + this.RESERVES_CREATE;
    return this.http.post(url, reserve, {headers, observe: 'response'});
  }

  deleteReserve(id: number) {
    const headers = this.authService.getHeaders();
    const url = this.BASE_URL + this.RESERVES + '/' + id;
    return this.http.delete(url, {headers, observe: 'response'});
  }

  getReservesByUserEmail(email: string) {
    const headers = this.authService.getHeaders();
    const url = this.BASE_URL + this.RESERVES + '/' + email;
    return this.http.get(url, {headers, observe: 'response'});
  }

  getReservesByCodeClass(code: string) {
    const headers = this.authService.getHeaders();
    const url = this.BASE_URL + this.RESERVES + '/' + code + '/users' ;
    return this.http.get(url, {headers, observe: 'response'});
  }
}
