import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CreateWorkoutDialogComponent} from '../shared/components/create-workout-dialog/create-workout-dialog.component';
import {Workout} from '../shared/models/workout.model';
import {WorkoutsService} from '../shared/services/workouts.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../shared/services/auth.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';


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

  constructor(public authService: AuthService,
              private workoutService: WorkoutsService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getWorkouts();
  }

  applyFilter(event: Event, dataSource: MatTableDataSource<Workout>) {
    const filter = (event.target as HTMLInputElement).value;
    dataSource.filter = filter.trim().toLowerCase();
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
    this.dataSource.data = this.workouts as Workout[];
    this.dataSource.sort = this.sort as MatSort;
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
            this.snackBar.open('Workout successfully created', 'OK', {duration: 3000});
          }, (error) => {
            this.snackBar.open('Workout cannot be created: Error ' + error.status, 'OK', {duration: 3000});
          });
        }
      });
  }
}
