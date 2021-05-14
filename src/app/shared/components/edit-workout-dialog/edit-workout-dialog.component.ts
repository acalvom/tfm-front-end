import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Workout} from '../../models/workout.model';

@Component({
  selector: 'app-edit-workout-dialog',
  templateUrl: './edit-workout-dialog.component.html',
  styleUrls: ['../dialog-style.css']
})
export class EditWorkoutDialogComponent implements OnInit {

  editWorkoutFormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    circuit: new FormControl(''),
    race: new FormControl(''),
    bar: new FormControl(''),
    pullups: new FormControl(''),
    fitness: new FormControl(''),
    comments: new FormControl(''),
  });

  constructor(public dialog: MatDialogRef<EditWorkoutDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Workout) {
  }

  ngOnInit(): void {
  }

  update() {
    let form;
    form = (this.editWorkoutFormGroup.value);
    for (let key in form) {
      if (form[key] === '') {
        form[key] = this.data[key];
      }
    }
    let workout = new Workout();
    workout.copyProperties(form);
    this.dialog.close(workout);
  }

  close() {
    this.dialog.close();
  }
}
