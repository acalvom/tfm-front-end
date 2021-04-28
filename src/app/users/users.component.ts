import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../shared/services/users.service';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../shared/models/user.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columns: string[] = ['name', 'surname', 'gender', 'email', 'dni', 'penalties'];
  users: User[] = [];
  students = new MatTableDataSource<User>();
  teachers = new MatTableDataSource<User>();

  constructor(private userService: UsersService) {
  }

  ngOnInit() {
    this.getStudents();
    this.getTeachers();
  }

  applyFilter(event: Event, dataSource: MatTableDataSource<User>) {
    const filter = (event.target as HTMLInputElement).value;
    dataSource.filter = filter.trim().toLowerCase();
  }

  getStudents() {
    this.userService.getStudents().subscribe(
      (response: any) => {
        this.generateUserFromArray(response.body);
        this.students.data = this.users as User[];
      });
  }

  getTeachers() {
    this.userService.getTeachers().subscribe(
      (response: any) => {
        this.generateUserFromArray(response.body);
        this.teachers.data = this.users as User[];
      });
  }

  generateUserFromArray(anyArray: any){
    this.users = [];
    for (let key in anyArray) {
      let user = new User();
      user.copyProperties(anyArray[key]);
      this.users.push(user);
    }
  }
}

