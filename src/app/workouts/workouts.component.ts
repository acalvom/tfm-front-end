import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CreateWorkoutDialogComponent} from '../shared/components/create-workout-dialog/create-workout-dialog.component';
import {Workout} from '../shared/models/workout.model';
import {WorkoutsService} from '../shared/services/workouts.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {

  constructor(private dialog: MatDialog, private workoutService: WorkoutsService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  createWorkout() {
    this.dialog.open(CreateWorkoutDialogComponent).afterClosed().subscribe(
      (newWorkout: Workout) => {
        if (newWorkout) {
          console.log(newWorkout);
          this.workoutService.createWorkout(newWorkout).subscribe(() => {
            this.snackBar.open('Workout successfully created', 'OK', {duration: 3000});
          }, (error) => {
            this.snackBar.open('Workout cannot be created: Error ' + error.status, 'OK', {duration: 3000});
          });
        }
      });
  }

}
