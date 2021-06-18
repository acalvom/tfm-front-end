import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CreateWorkoutDialogComponent} from '../shared/components/create-workout-dialog/create-workout-dialog.component';
import {Workout} from '../shared/models/workout.model';
import {WorkoutsService} from '../shared/services/workouts.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../shared/services/auth.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {YesNoDialogComponent} from '../shared/components/yes-no-dialog/yes-no-dialog.component';
import {EditWorkoutDialogComponent} from '../shared/components/edit-workout-dialog/edit-workout-dialog.component';


@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})

export class WorkoutsComponent implements OnInit {

  columns: string[] = ['id', 'title', 'description', 'circuit', 'race', 'bar', 'pullups', 'fitness', 'comments', 'creationdate'];
  workouts: Workout[] = [];
  dataSource = new MatTableDataSource<Workout>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public authService: AuthService,
              private workoutService: WorkoutsService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (this.authService.isTeacher()) {
      this.columns = ['id', 'title', 'description', 'circuit', 'race', 'bar', 'pullups', 'fitness', 'comments', 'creationdate', 'action'];
    }
    this.getWorkouts();
  }

  getWorkouts() {
    this.workoutService.getWorkouts().subscribe(
      (response: any) => {
        this.generateWorkoutFromArray(response.body);
        this.setTableTools();
      });
  }

  createWorkout() {
    this.dialog.open(CreateWorkoutDialogComponent).afterClosed().subscribe(
      (newWorkout: Workout) => {
        if (newWorkout) {
          this.workoutService.createWorkout(newWorkout).subscribe(() => {
            this.getWorkouts();
            this.snackBar.open('Workout successfully created', 'OK', {duration: 3000});
          }, (error) => {
            this.snackBar.open('Workout cannot be created: Error ' + error.status, 'OK', {duration: 3000});
          });
        }
      });
  }

  deleteWorkout(workout: Workout) {
    let data = 'Do you really want to delete workout ' + workout.id + ' ?';
    this.dialog.open(YesNoDialogComponent, {data: data}).afterClosed().subscribe(
      (remove: boolean) => {
        if (remove) {
          this.workoutService.deleteWorkout(workout.id).subscribe(() => {
            this.snackBar.open('Workout successfully deleted', 'OK', {duration: 3000});
            this.getWorkouts();
          }, (error) => {
            this.snackBar.open(error.error[0], 'OK', {duration: 5000});
          });
        }
      });
  }

  updateWorkout(workout: Workout) {
    this.dialog.open(EditWorkoutDialogComponent, {data: workout}).afterClosed().subscribe(
      (editedWorkout: Workout) => {
        if (editedWorkout) {
          console.log(editedWorkout);
          this.workoutService.editWorkout(workout.id, editedWorkout).subscribe(() => {
            this.snackBar.open('Workout successfully edited', 'OK', {duration: 3000});
            this.getWorkouts();
          }, (error) => {
            this.snackBar.open('Workout cannot be edited: Error ' + error.status, 'OK', {duration: 3000});
          });
        }
      });
  }

  applyFilter(event: Event, dataSource: MatTableDataSource<Workout>) {
    const filter = (event.target as HTMLInputElement).value;
    dataSource.filter = filter.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  generateWorkoutFromArray(anyArray: any) {
    this.workouts = [];
    for (let key in anyArray) {
      let workout = new Workout();
      workout.copyProperties(anyArray[key]);
      this.workouts.push(workout);
    }
  }

  setTableTools() {
    this.dataSource.data = this.workouts;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
