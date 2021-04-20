import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserRestService} from '../shared/services/user-rest.service';
import {AES} from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private connection: UserRestService) {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  token;
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
      this.connection.loginUser(userCredentials).subscribe(
        response => {
          this.token = response.headers.get('Authorization');
          this.connection.setToken(userCredentials.email, this.token);
          this.loginStatusCode = response.status;
        },
        (error) => {
          this.loginStatusCode = error.status;
        }
      );
      console.log('Logged user and password: ' + userCredentials.email + '  ' + userCredentials.password);
      console.log('Token: ' + this.token + ' Login Status: ' + this.loginStatusCode);
    }
  }

  ngOnInit(): void {
  }

}
