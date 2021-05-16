import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Class} from '../../models/class.model';
import {WorkoutsService} from '../../services/workouts.service';

@Component({
  selector: 'app-create-class-dialog',
  templateUrl: './create-class-dialog.component.html',
  styleUrls: ['../dialog-style.css']
})
export class CreateClassDialogComponent implements OnInit {

  workout_idErrorMsg: string;
  workout_idError: boolean;

  createClassFormGroup = new FormGroup({
    init_day_hour: new FormControl('', [Validators.required]),
    end_day_hour: new FormControl('', [Validators.required]),
    max_places: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    location_details: new FormControl(''),
    id_workout: new FormControl('', [Validators.required])
  });

  constructor(public dialog: MatDialogRef<CreateClassDialogComponent>, private workoutService: WorkoutsService) {
  }

  ngOnInit(): void {
  }

  create() {
    if (this.isValidForm()) {
      let newClass = new Class();
      newClass.copyProperties(this.createClassFormGroup.value);
      this.dialog.close(newClass);
    }
  }

  verifyWorkout(evt) {
    this.workoutService.getWorkout(this.createClassFormGroup.get('id_workout').value).subscribe(
      response => {
        if (response.status === 200) {
          this.workout_idErrorMsg = '';
          this.workout_idError = false;
          evt.preventDefault();
        }
      },
      (error) => {
        this.workout_idErrorMsg = 'Workout ' + this.createClassFormGroup.get('id_workout').value + ' ' + error.statusText;
        this.workout_idError = true;
      });
  }

  isValidForm() {
    return this.createClassFormGroup.valid && !this.workout_idError;
  }

  close() {
    this.dialog.close();
  }

  getErrorMessage(field: string) {
    if (this.createClassFormGroup.get(field).hasError('required')) {
      return 'You must enter a value';
    } else {
      return '';
    }
  }


}
