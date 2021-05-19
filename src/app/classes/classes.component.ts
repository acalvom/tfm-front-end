import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CreateClassDialogComponent} from '../shared/components/create-class-dialog/create-class-dialog.component';
import {Class} from '../shared/models/class.model';
import {ClassesService} from '../shared/services/classes.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {YesNoDialogComponent} from '../shared/components/yes-no-dialog/yes-no-dialog.component';
import {EditClassDialogComponent} from '../shared/components/edit-class-dialog/edit-class-dialog.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  columns: string[] = ['code', 'init_day_hour', 'end_day_hour', 'max_places', 'current_places', 'location', 'location_details', 'id_workout'];
  classes: Class[] = [];
  dataSource = new MatTableDataSource<Class>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public authService: AuthService,
              private classesService: ClassesService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (this.authService.isTeacher()) {
      this.columns = ['code', 'init_day_hour', 'end_day_hour', 'max_places', 'current_places', 'location', 'location_details', 'id_workout', 'action'];
    }
    this.getClasses();
  }

  getClasses() {
    this.classesService.getClasses().subscribe(
      (response: any) => {
        this.generateClassFromArray(response.body);
        this.setTableTools();
      });
  }

  createClass() {
    this.dialog.open(CreateClassDialogComponent).afterClosed().subscribe(
      (newClass: Class) => {
        if (newClass) {
          let date = newClass.init_day_hour;
          newClass.code = date.getDate().toString() + date.getMonth().toString() + date.getFullYear().toString() + date.getHours().toString()
            + date.getMinutes().toString() + newClass.location;
          this.classesService.createClass(newClass).subscribe(() => {
            this.getClasses();
            this.snackBar.open('Class successfully created', 'OK', {duration: 3000});
          }, (error) => {
            this.snackBar.open('Class cannot be created: Error ' + error.status, 'OK', {duration: 3000});
          });
        }
      });
  }

  deleteClass(aClass: Class) {
    let data = 'Do you really want to delete class ' + aClass.code + ' ?';
    this.dialog.open(YesNoDialogComponent, {data: data}).afterClosed().subscribe(
      (remove: Boolean) => {
        if (remove) {
          this.classesService.deleteClass(aClass.code).subscribe(() => {
            this.snackBar.open('Class successfully deleted', 'OK', {duration: 3000});
            this.getClasses();
          }, (error) => {
            this.snackBar.open('Class cannot be deleted: Error ' + error.status, 'OK', {duration: 3000});
          });
        }
      });
  }

  updateClass(aClass: Class) {
    this.dialog.open(EditClassDialogComponent, {data: aClass}).afterClosed().subscribe(
      (editedClass: Class) => {
        if (editedClass) {
          console.log(editedClass);
          this.classesService.editClass(aClass.code, editedClass).subscribe(() => {
            this.snackBar.open('Class successfully edited', 'OK', {duration: 3000});
            this.getClasses();
          }, (error) => {
            this.snackBar.open('Class cannot be edited: Error ' + error.status, 'OK', {duration: 3000});
          });
        }
      });
  }

  applyFilter(event: Event, dataSource: MatTableDataSource<Class>) {
    const filter = (event.target as HTMLInputElement).value;
    dataSource.filter = filter.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  generateClassFromArray(anyArray: any) {
    this.classes = [];
    for (let key in anyArray) {
      let aClass = new Class();
      aClass.copyProperties(anyArray[key]);
      this.classes.push(aClass);
    }
  }

  setTableTools() {
    this.dataSource.data = this.classes as Class[];
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator;
  }

}
