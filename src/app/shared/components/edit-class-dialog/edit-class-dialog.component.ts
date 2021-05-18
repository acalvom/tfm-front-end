import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {WorkoutsService} from '../../services/workouts.service';
import {Class} from '../../models/class.model';

@Component({
  selector: 'app-edit-class-dialog',
  templateUrl: './edit-class-dialog.component.html',
  styleUrls: ['../dialog-style.css']
})
export class EditClassDialogComponent {

  workout_idErrorMsg: string;
  workout_idError: boolean;

  editClassFormGroup = new FormGroup({
    init_day_hour: new FormControl(''),
    end_day_hour: new FormControl(''),
    max_places: new FormControl(''),
    location: new FormControl(''),
    location_details: new FormControl(''),
    id_workout: new FormControl('')
  });

  constructor(public dialog: MatDialogRef<EditClassDialogComponent>,
              private workoutService: WorkoutsService,
              @Inject(MAT_DIALOG_DATA) public data: Class) {
  }

  update() {
    if (!this.workout_idError) {
      let form;
      form = (this.editClassFormGroup.value);
      for (let key in form) {
        if (form[key] === '') {
          form[key] = this.data[key];
        }
      }
      let newClass = new Class();
      newClass.copyProperties(this.editClassFormGroup.value);
      this.dialog.close(newClass);
    }
  }

  verifyWorkout(evt) {
    this.workoutService.getWorkout(this.editClassFormGroup.get('id_workout').value).subscribe(
      response => {
        if (response.status === 200) {
          this.workout_idErrorMsg = '';
          this.workout_idError = false;
          evt.preventDefault();
        }
      },
      (error) => {
        this.workout_idErrorMsg = 'Workout ' + this.editClassFormGroup.get('id_workout').value + ' ' + error.statusText;
        this.workout_idError = true;
      });
  }


  close() {
    this.dialog.close();
  }

}
