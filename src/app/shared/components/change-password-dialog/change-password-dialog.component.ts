import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-change-password-phone',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['../dialog-style.css']
})
export class ChangePasswordDialogComponent implements OnInit {

  hide = true;
  changePasswordFormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(public dialog: MatDialogRef<ChangePasswordDialogComponent>) {
  }

  ngOnInit(): void {
  }

  getErrorMessage(field: string) {
    if (this.changePasswordFormGroup.get(field).hasError('required')) {
      return 'You must enter a value';
    } else {
      return '';
    }
  }

  isValidForm() {
    return this.changePasswordFormGroup.valid;
  }

  comparePasswords() {
    return (this.changePasswordFormGroup.get('newPassword').value === this.changePasswordFormGroup.get('confirmPassword').value);
  }

  update() {
    if (this.isValidForm() && this.comparePasswords()) {
      this.dialog.close(this.changePasswordFormGroup.value);
    }
  }

  close() {
    this.dialog.close();
  }

}
