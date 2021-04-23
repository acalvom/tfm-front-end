import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() {
  }

  dniPattern = '^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$';
  userFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required, Validators.pattern(this.dniPattern)]),
    gender: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  hide = true;
  user = new User;

  getErrorMessage(field: string) {
    if (this.userFormGroup.get(field).hasError('required')) {
      return 'You must enter a value';
    }
    if (this.userFormGroup.get('email').hasError('email')) {
      return 'Not a valid email';
    }
    if (this.userFormGroup.get('dni').hasError('pattern')) {
      return 'Incorrect DNI';
    } else {
      return '';
    }
  }

  isValidForm() {
    return this.userFormGroup.valid;
  }

  registerUser(): void {
    if (!this.isValidForm()) {
      this.user.name = this.userFormGroup.get('name').value;
      this.user.surname = this.userFormGroup.get('surname').value;
      this.user.dni = this.userFormGroup.get('dni').value.toUpperCase();
      this.user.gender = this.userFormGroup.get('gender').value;
      this.user.email = this.userFormGroup.get('email').value;
      this.user.password = this.userFormGroup.get('password').value;
      this.user.penalties = 0;
      this.user.role = this.userFormGroup.get('role').value;
    }
  }

  ngOnInit(): void {
  }

}
