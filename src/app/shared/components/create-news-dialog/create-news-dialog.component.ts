import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {News} from '../../models/news.model';

@Component({
  selector: 'app-create-news-dialog',
  templateUrl: './create-news-dialog.component.html',
  styleUrls: ['../dialog-style.css']
})
export class CreateNewsDialogComponent {

  createNewsFormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(public dialog: MatDialogRef<CreateNewsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: News) {
  }

  create() {
    let news = new News();
    news.copyProperties(this.createNewsFormGroup.value);
    news.creation_date = new Date();
    console.log(news);
    this.dialog.close(news);
  }

  getErrorMessage(field: string) {
    if (this.createNewsFormGroup.get(field).hasError('required')) {
      return 'Field cannot be empty';
    } else {
      return '';
    }
  }

  isValidForm() {
    return this.createNewsFormGroup.valid;
  }

  close() {
    this.dialog.close();
  }

}
