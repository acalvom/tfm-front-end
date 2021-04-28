import {Component, OnInit} from '@angular/core';
import {UsersService} from '../shared/services/users.service';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../shared/models/user.model';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  columns: string[] = ['name', 'surname', 'gender', 'email', 'dni', 'penalties'];
  users: User[] = [];

  students = new MatTableDataSource<User>();
  teachers = new MatTableDataSource<User>();
  dataSource = new MatTableDataSource<User>();


  constructor(private userService: UsersService) {
  }

  ngOnInit() {
    this.getStudents();
    this.getTeachers();
  }

  applyFilterStudent(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.students.filter = filtro.trim().toLowerCase();
  }

  applyFilterTeacher(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.teachers.filter = filtro.trim().toLowerCase();
  }

  getStudents() {
    this.userService.getStudents().subscribe(
      (response: any) => {
        this.users = [];
        for (let key in response.body) {
          let user = new User();
          user.copyProperties(response.body[key]);
          this.users.push(user);
        }
        this.students.data = this.users as User[];
      });
  }

  getTeachers() {
    this.userService.getTeachers().subscribe(
      (response: any) => {
        this.users = [];
        for (let key in response.body) {
          let user = new User();
          user.copyProperties(response.body[key]);
          this.users.push(user);
        }
        this.teachers.data = this.users as User[];
      });
  }
}

//   constructor(private userService: UsersService) {
//   }
//   students: any[] = [];
//   teachers: any[];
//   columns: string[] = ['name','surname','gender','email', 'dni', 'penalties'];
//   getStudentsStatusCode;
//   public dataSource = new MatTableDataSource<User>();
//   sort: MatSort;
//
//   public doFilter = (value: string) => {
//     this.dataSource.filter = value.trim().toLocaleLowerCase();
//   }
//
//   applyFilter(filterValue: String) {
//     console.log(filterValue)
//     console.log(this.dataSource)
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//   }
//
//   getStudents() {
//     this.userService.getStudents().subscribe(
//       (value: any) => {
//         this.students = value.body;
//         this.dataSource.data = value as User[];
//       });
//   }
//
//   getTeachers() {
//     this.userService.getTeachers().subscribe(
//       (value:any) => {
//         this.teachers = value.body;
//       });
//   }
//
//
//   ngOnInit(): void {
//     this.getStudents();
//     this.getTeachers();
//
//   }
//   ngAfterViewInit(): void {
//     this.dataSource.sort = this.sort;
//   }
//
// }
