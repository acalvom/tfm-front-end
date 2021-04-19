import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {
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

  loginUser(email: FormControl, password: string): void {
    console.log('Logged user and password: ' + email.value + '  ' + password);
  }

  ngOnInit(): void {
  }

}
