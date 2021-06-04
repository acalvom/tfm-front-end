import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['../dialog-style.css']
})
export class EditUserDialogComponent implements OnInit {

  dniPattern = '^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$';

  constructor(public dialog: MatDialogRef<EditUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User) {
  }

  ngOnInit(): void {
  }

  editUserFormGroup = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    dni: new FormControl('', [Validators.pattern(this.dniPattern)]),
    gender: new FormControl(''),
    email: new FormControl('', [Validators.email]),
  });


  getErrorMessage() {
    if (this.editUserFormGroup.get('email').hasError('email')) {
      return 'Not a valid email';
    }
    if (this.editUserFormGroup.get('dni').hasError('pattern')) {
      return 'Incorrect DNI. WARN: Letter must be CAPS';
    } else {
      return '';
    }
  }

  isValidForm() {
    return this.editUserFormGroup.valid;
  }

  update() {
    let user = new User();
    user.copyProperties(this.editUserFormGroup.value);
    if (user.name === '') {
      user.name = this.data.name;
    }
    if (user.surname === '') {
      user.surname = this.data.surname;
    }
    if (user.dni === '') {
      user.dni = this.data.dni;
    }
    if (user.gender === '') {
      user.gender = this.data.gender;
    }
    if (user.email === '') {
      user.email = this.data.email;
    }
    this.dialog.close(user);
  }

  close() {
    this.dialog.close();
  }

}
