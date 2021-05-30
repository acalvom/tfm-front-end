import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {CreateNewsDialogComponent} from '../shared/components/create-news-dialog/create-news-dialog.component';
import {News} from '../shared/models/news.model';
import {NewsService} from '../shared/services/news.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(public authService: AuthService,
              private newsService: NewsService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  createNews() {
    this.dialog.open(CreateNewsDialogComponent).afterClosed().subscribe(
      (news: News) => {
        if (news) {
          let date = new Date();
          news.creation_date = date;
          news.code = news.dateToCode(date);

          this.newsService.createNews(news).subscribe(() => {
            this.snackBar.open('News successfully created', 'OK', {duration: 3000});
          }, (error) => {
            this.snackBar.open('News cannot be created: Error ' + error.status, 'OK', {duration: 3000});
          });
        }
      });
  }

}
