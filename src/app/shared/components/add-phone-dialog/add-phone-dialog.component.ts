import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-change-phone-dialog',
  templateUrl: './add-phone-dialog.component.html',
  styleUrls: ['../dialog-style.css']
})
export class AddPhoneDialogComponent {

  phonePattern = '^[6][0-9]{8}$';
  phone = new FormControl('', [Validators.required, Validators.pattern(this.phonePattern)]);
  phoneValue: string;

  constructor(public dialog: MatDialogRef<AddPhoneDialogComponent>) {
  }


  add() {
    if (this.phone.valid) {
      this.dialog.close(this.phone.value);
    }
  }

  close() {
    this.dialog.close();
  }
}
