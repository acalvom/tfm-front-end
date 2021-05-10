import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CreateWorkoutDialogComponent} from '../shared/components/create-workout-dialog/create-workout-dialog.component';
import {Workout} from '../shared/models/workout.model';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  createWorkout() {
    this.dialog.open(CreateWorkoutDialogComponent).afterClosed().subscribe(
      (newWorkout: Workout) => {
        if (newWorkout) {
          console.log(newWorkout);
        }
      });
  }

}
