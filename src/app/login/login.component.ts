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
  password = '';
  hide = true;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  loginUser(email: string, password: string): void {
    this.connection.loginUser(email, password).subscribe();
    console.log('Logged user and password: ' + email + '  ' + password);
  }

  ngOnInit(): void {
  }

}
