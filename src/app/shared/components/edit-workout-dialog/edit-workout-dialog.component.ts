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
    let workout;
    workout = (this.editWorkoutFormGroup.value);
    console.log('this.data');

    console.log(this.data);
    console.log('workout');
    console.log(workout);
    if (workout.title === '') {
      workout.title = this.data.title;
    }
    if (workout.description === '') {
      workout.description = this.data.description;
    }
    if (workout.circuit === '') {
      workout.circuit = this.data.circuit;
    }
    if (workout.race === '') {
      workout.race = this.data.race;
    }
    if (workout.bar === '') {
      workout.bar = this.data.bar;
    }
    if (workout.pullups === '') {
      workout.pullups = this.data.pullups;
    }
    if (workout.fitness === '') {
      workout.fitness = this.data.fitness;
    }
    if (workout.comments === '') {
      workout.comments = this.data.comments;
    }
    let nn = new Workout();
    nn.copyProperties(workout);
    console.log('nn');
    console.log(nn);
    this.dialog.close(workout);
  }

  isValidForm() {
    return this.editWorkoutFormGroup.valid;
  }

  close() {
    this.dialog.close();
  }
}
