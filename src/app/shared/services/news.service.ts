import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {News} from '../models/news.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private BASE_URL = environment.BASE_URL;
  private NEWS_CREATE = '/news/create';
  private NEWS = '/news';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  createNews(news: News) {
    console.log(news);
    const headers = this.authService.getHeaders();
    let url = this.BASE_URL + this.NEWS_CREATE;
    return this.http.post(url, news, {headers, observe: 'response'});
  }

  getLastNews() {
    const headers = this.authService.getHeaders();
    return this.http.get(this.BASE_URL + this.NEWS, {headers, observe: 'response'});
  }

  deleteNews(code: string) {
    const headers = this.authService.getHeaders();
    const url = this.BASE_URL + this.NEWS + '/' + code;
    return this.http.delete(url, {headers, observe: 'response'});
  }
}
