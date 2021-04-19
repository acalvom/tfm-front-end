import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserRestService} from '../shared/services/user-rest.service';

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
        password: this.password.value
      };
      this.connection.loginUser(userCredentials).subscribe();
      console.log('Logged user and password: ' + userCredentials.email + '  ' + userCredentials.password);
    }
  }

  ngOnInit(): void {
  }

}
