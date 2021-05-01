import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {AES} from 'crypto-js';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
  }

  hide = true;
  token;
  role;
  loginStatusCode;


  loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  getErrorMessage(field: string) {
    if (this.loginFormGroup.get(field).hasError('required')) {
      return 'You must enter a value';
    }
    if (this.loginFormGroup.get('email').hasError('email')) {
      return 'Not a valid email';
    } else {
      return '';
    }
  }

  loginUser(): void {
    if (this.loginFormGroup.valid) {
      const userCredentials = {
        email: this.loginFormGroup.get('email').value,
        password: AES.encrypt(this.loginFormGroup.get('password').value, 'password').toString()
      };
      this.authService.loginUser(userCredentials).subscribe(
        response => {
          this.token = response.headers.get('Authorization');
          this.role = response.headers.get('Role');
          this.authService.setToken(userCredentials.email, this.role, this.token);
          this.loginStatusCode = response.status;
          this.router.navigate(['home']).then();
        },
        (error) => {
          this.loginStatusCode = error.status;
          this.snackBar.open('Wrong email or password', 'OK', {duration: 5000});
        });
    }
  }
}

