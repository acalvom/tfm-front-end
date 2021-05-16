import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Class} from '../../models/class.model';

@Component({
  selector: 'app-create-class-dialog',
  templateUrl: './create-class-dialog.component.html',
  styleUrls: ['../dialog-style.css']
})
export class CreateClassDialogComponent implements OnInit {

  createClassFormGroup = new FormGroup({
    init_day_hour: new FormControl('', [Validators.required]),
    end_day_hour: new FormControl('', [Validators.required]),
    max_places: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    location_details: new FormControl(''),
    id_workout: new FormControl('', [Validators.required])
  });

  constructor(public dialog: MatDialogRef<CreateClassDialogComponent>) {
  }

  ngOnInit(): void {
  }

  create() {
    let newClass = new Class();
    console.log('form');
    console.log(this.createClassFormGroup.value);

    newClass.copyProperties(this.createClassFormGroup.value);
    //console.log(newClass);
    this.dialog.close(newClass);
  }

  close() {
    this.dialog.close();
  }

}
