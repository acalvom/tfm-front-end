import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {CreateNewsDialogComponent} from '../shared/components/create-news-dialog/create-news-dialog.component';
import {News} from '../shared/models/news.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(public authService: AuthService, private dialog: MatDialog) {
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
          console.log(news);
        }
      });
  }

}
