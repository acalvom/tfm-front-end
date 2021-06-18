import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {CreateNewsDialogComponent} from '../shared/components/create-news-dialog/create-news-dialog.component';
import {News} from '../shared/models/news.model';
import {NewsService} from '../shared/services/news.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {YesNoDialogComponent} from '../shared/components/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: News[] = [];

  constructor(public authService: AuthService,
              private newsService: NewsService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    this.getLastNews();
  }

  createNews() {
    this.dialog.open(CreateNewsDialogComponent).afterClosed().subscribe(
      (news: News) => {
        if (news) {
          let date = new Date();
          news.creation_date = date;
          news.code = news.dateToCode(date);
          this.newsService.createNews(news).subscribe(() => {
            this.getLastNews();
            this.snackBar.open('News successfully created', 'OK', {duration: 3000});
          }, (error) => {
            this.snackBar.open('News cannot be created: Error ' + error.status, 'OK', {duration: 3000});
          });
        }
      });
  }

  getLastNews() {
    this.newsService.getLastNews().subscribe(
      (response: any) => {
        this.generateNewsFromArray(response.body);
      });
  }

  deleteNews(code: string) {
    let data = 'Do you really want to delete this board?';
    this.dialog.open(YesNoDialogComponent, {data: data}).afterClosed().subscribe(
      (remove: boolean) => {
        if (remove) {
          this.newsService.deleteNews(code).subscribe(() => {
            this.snackBar.open('Board successfully deleted', 'OK', {duration: 3000});
            this.getLastNews();
          }, (error) => {
            this.snackBar.open('Board cannot be deleted: Error ' + error.status, 'OK', {duration: 3000});
          });
        }
      });
  }

  generateNewsFromArray(anyArray: any) {
    this.news = [];
    for (let key in anyArray) {
      let news = new News();
      news.copyProperties(anyArray[key]);
      this.news.push(news);
    }
  }

}
