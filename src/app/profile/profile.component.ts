import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  aText: string = 'hola';

  constructor() {
  }

  ngOnInit(): void {
  }

  userFormGroup = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    dni: new FormControl(''),
    phone: new FormControl(''),
    gender: new FormControl(''),
    role: new FormControl(''),
    email: new FormControl(''),
    penalties: new FormControl(''),
  });

}
