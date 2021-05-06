import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-change-phone-dialog',
  templateUrl: './add-phone-dialog.component.html',
  styleUrls: ['../dialog-style.css']
})
export class AddPhoneDialogComponent implements OnInit {

  phonePattern = '^[6][0-9]{8}$';
  phone = new FormControl('', [Validators.required, Validators.pattern(this.phonePattern)])

  constructor(public dialog: MatDialogRef<AddPhoneDialogComponent>) { }

  ngOnInit(): void {
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
