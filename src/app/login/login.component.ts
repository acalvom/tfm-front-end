import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {AES} from 'crypto-js';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  token;
  role;
  loginStatusCode;

  getErrorMessage() {
    if (this.email.hasError('required') || (this.password.hasError('required'))) {
      return 'You must enter a value';
    }
    let emailErrorMessage = this.email.hasError('email') ? 'Not a valid email' : '';
    let passwordErrorMessage = this.password.hasError('required') ? 'Password required' : '';
    return (emailErrorMessage || passwordErrorMessage);
  }

  loginUser(): void {
    if (!this.getErrorMessage()) {
      const userCredentials = {
        email: this.email.value,
        password: AES.encrypt(this.password.value, 'password').toString()
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
        }
      );
      // console.log('User: ' + userCredentials.email + ' Role: ' + this.role);
      // console.log('Token: ' + this.token + ' Login Status: ' + this.loginStatusCode);
    }
  }

  // This is only to validate token verification
  // sendToken() {
  //   this.authService.validToken(this.email.value, this.token).subscribe(
  //     (res) => {
  //       console.log(res);
  //     }
  //   );
  //   // console.log('is admin: ' + this.connection.isAdmin());
  //   // console.log('is teacher: ' + this.connection.isTeacher());
  //   // console.log('is student: ' + this.connection.isStudent());
  // }

  ngOnInit(): void {
  }

}
