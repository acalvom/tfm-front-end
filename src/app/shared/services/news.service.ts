import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {News} from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private BASE_URL = 'http://localhost:8000';
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
}
