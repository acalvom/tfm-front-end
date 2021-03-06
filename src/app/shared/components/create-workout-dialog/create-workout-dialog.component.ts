import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Workout} from '../../models/workout.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-workout-dialog',
  templateUrl: './create-workout-dialog.component.html',
  styleUrls: ['../dialog-style.css']
})
export class CreateWorkoutDialogComponent {

  createWorkoutFormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    circuit: new FormControl('', [Validators.required]),
    race: new FormControl('', [Validators.required]),
    bar: new FormControl('', [Validators.required]),
    pullups: new FormControl('', [Validators.required]),
    fitness: new FormControl(''),
    comments: new FormControl(''),
  });

  constructor(public dialog: MatDialogRef<CreateWorkoutDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Workout) {
  }

  create() {
    let newWorkout = new Workout();
    newWorkout.copyProperties(this.createWorkoutFormGroup.value);
    newWorkout.creationdate = new Date();
    console.log(newWorkout);
    this.dialog.close(newWorkout);
  }

  getErrorMessage(field: string) {
    if (this.createWorkoutFormGroup.get(field).hasError('required')) {
      return 'Field cannot be empty';
    } else {
      return '';
    }
  }

  isValidForm() {
    return this.createWorkoutFormGroup.valid;
  }

  close() {
    this.dialog.close();
  }
}
