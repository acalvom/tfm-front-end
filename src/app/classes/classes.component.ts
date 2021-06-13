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
import {ReservesService} from '../shared/services/reserves.service';
import {Reserve} from '../shared/models/reserve.model';
import {Router} from '@angular/router';
import {UsersService} from '../shared/services/users.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  columns: string[] = ['code', 'init_day_hour', 'end_day_hour', 'max_places', 'current_places', 'location', 'location_details', 'id_workout'];
  classes: Class[] = [];
  dataSource = new MatTableDataSource<Class>();
  reserves: Reserve[] = [];
  authenticatedUser: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public authService: AuthService,
              private usersService: UsersService,
              private classesService: ClassesService,
              private reservesService: ReservesService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.authenticatedUser = this.authService.getLoggedUser();
    if (this.authService.isTeacher()) {
      this.columns = ['code', 'init_day_hour', 'end_day_hour', 'max_places', 'current_places', 'location', 'location_details', 'id_workout', 'reserveDetail', 'action'];
    } else if (this.authService.isStudent()) {
      this.columns = ['code', 'init_day_hour', 'end_day_hour', 'max_places', 'current_places', 'location', 'location_details', 'id_workout', 'reserves'];
      this.getReservesByUserEmail();
    } else {
      this.columns = ['code', 'init_day_hour', 'end_day_hour', 'max_places', 'current_places', 'location', 'location_details', 'id_workout', 'reserveDetail'];
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
          this.classesService.editClass(aClass.code, editedClass).subscribe(() => {
            this.snackBar.open('Class successfully edited', 'OK', {duration: 3000});
            this.getClasses();
          }, (error) => {
            this.snackBar.open('Class cannot be edited: Error ' + error.status, 'OK', {duration: 3000});
          });
        }
      });
  }

  updateClassPlaces(code: string, value: number) {
    this.classesService.updateClassPlaces(code, value).subscribe(() => {
      this.getClasses();
    });
  }

  reserveClass(aClass: Class) {
    let reserve = new Reserve();
    reserve.email_user = this.authService.getLoggedUser();
    reserve.code_class = aClass.code;
    this.reservesService.createReserve(reserve).subscribe(
      () => {
        this.getReservesByUserEmail();
        this.snackBar.open('You are in!', 'OK', {duration: 3000});
        this.updateClassPlaces(aClass.code, 1);
      },
      () => {
        this.snackBar.open('You cannot reserve this class', 'OK', {duration: 3000});
      });
  }

  cancelReserve(aClass: Class) {
    let reserveId = this.reserves.find(item => item.code_class === aClass.code).id;
    this.reservesService.deleteReserve(reserveId).subscribe(() => {
        this.getReservesByUserEmail();
        this.snackBar.open('Reserve cancelled', 'OK', {duration: 3000});
        this.updateClassPlaces(aClass.code, -1);
      },
      () => {
        this.snackBar.open('Reserve cannot be cancelled', 'OK', {duration: 3000});
      });
  }

  warningReserve() {
    this.usersService.getUserByEmail(this.authenticatedUser).subscribe(
      (response: any) => {
        console.log(response.body[0].penalties);
      }
    );
  }

  getReservesByUserEmail() {
    this.reservesService.getReservesByUserEmail(this.authenticatedUser).subscribe(
      (response: any) => {
        this.reserves = response.body;
      });
  }

  getReservesByCodeClass(code: string) {
    this.router.navigate(['/reserves', code]).then();
  }

  readReserves(code: string) {
    let match = this.reserves.find(item => item.code_class === code);
    return match !== undefined;
  }

  disableReserveButton(aClass: Class) {
    return aClass.isExpired() || aClass.current_places >= aClass.max_places;
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
