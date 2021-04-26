import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/models/user.model';
import {AuthService} from '../shared/services/auth.service';
import {AES} from 'crypto-js';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
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

  createNewUser(): User {
    let user = new User;
    user.name = this.userFormGroup.get('name').value;
    user.surname = this.userFormGroup.get('surname').value;
    user.dni = this.userFormGroup.get('dni').value.toUpperCase();
    user.gender = this.userFormGroup.get('gender').value;
    user.email = this.userFormGroup.get('email').value;
    let password = this.userFormGroup.get('password').value;
    user.password = AES.encrypt(password, 'password').toString();
    user.penalties = 0;
    user.role = this.userFormGroup.get('role').value;
    return user;
  }

  registerUser(): void {
    if (this.isValidForm()) {
      let newUser = this.createNewUser();
      console.log(JSON.stringify(newUser));
      this.authService.registerUser(newUser).subscribe(
        response => {
          console.log(response.body);
          this.registerStatusCode = response.status;
          this.router.navigate(['login']).then();
        },
        (error) => {
          this.registerStatusCode = error.status;
        }
      );
    }
  }

  ngOnInit(): void {
  }

}
