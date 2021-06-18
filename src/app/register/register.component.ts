import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/models/user.model';
import {AuthService} from '../shared/services/auth.service';
import {AES} from 'crypto-js';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
  }

  dniPattern = '^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$';
  hide = true;
  token;
  role;
  registerStatusCode;

  userFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required, Validators.pattern(this.dniPattern)]),
    gender: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  registerUser(): void {
    if (this.isValidForm()) {
      let newUser = this.createNewUser();
      this.authService.registerUser(newUser).subscribe(
        response => {
          this.registerStatusCode = response.status;
          this.snackBar.open('User successfully registered', 'OK', {duration: 5000});
          this.clearForm();
        },
        (error) => {
          this.registerStatusCode = error.status;
          this.snackBar.open(newUser.email + ' ' + error.error, 'OK', {duration: 5000});
        });
    }
  }

  createNewUser(): User {
    let user = new User;
    user.name = this.userFormGroup.get('name').value;
    user.surname = this.userFormGroup.get('surname').value;
    user.dni = this.userFormGroup.get('dni').value.toUpperCase();
    user.gender = this.userFormGroup.get('gender').value;
    user.email = this.userFormGroup.get('email').value;
    user.password = AES.encrypt(this.userFormGroup.get('password').value, 'password').toString();
    user.role = this.userFormGroup.get('role').value;
    if (user.role === 'student') {
      user.penalties = 0;
    } else {
      user.penalties = null;
    }
    return user;
  }

  getErrorMessage(field: string) {
    if (this.userFormGroup.get(field).hasError('required')) {
      return 'You must enter a value';
    }
    if (this.userFormGroup.get('email').hasError('email')) {
      return 'Not a valid email';
    }
    if (this.userFormGroup.get('dni').hasError('pattern')) {
      return 'Incorrect DNI. WARN: Letter must be CAPS';
    } else {
      return '';
    }
  }

  isValidForm() {
    return this.userFormGroup.valid;
  }

  clearForm(): void {
    this.userFormGroup.reset();
  }
}
