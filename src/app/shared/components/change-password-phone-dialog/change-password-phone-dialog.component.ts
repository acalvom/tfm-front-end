import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-change-password-phone',
  templateUrl: './change-password-phone-dialog.component.html',
  styleUrls: ['./change-password-phone-dialog.component.css']
})
export class ChangePasswordPhoneDialogComponent implements OnInit {

  hide = true;
  changeFormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(public dialog: MatDialogRef<ChangePasswordPhoneDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User) {
  }

  ngOnInit(): void {
  }

  getErrorMessage(field: string) {
    if (this.changeFormGroup.get(field).hasError('required')) {
      return 'You must enter a value';
    } else {
      return '';
    }
  }

  isValidForm() {
    return this.changeFormGroup.valid;
  }

  comparePasswords() {
    return (this.changeFormGroup.get('newPassword').value === this.changeFormGroup.get('confirmPassword').value);
  }


  update() {
    if (this.isValidForm() && this.comparePasswords()) {
      this.dialog.close(this.changeFormGroup.value);
    }
  }

  close() {
    this.dialog.close();
  }

}
