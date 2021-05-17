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
          newClass.code = newClass.init_day_hour.toLocaleString() + '-' + newClass.location;
          this.classesService.createClass(newClass).subscribe(() => {
            this.snackBar.open('Class successfully created', 'OK', {duration: 3000});
          }, (error) => {
            this.snackBar.open('Class cannot be created: Error ' + error.status, 'OK', {duration: 3000});
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
