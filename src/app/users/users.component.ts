import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../shared/services/users.service';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../shared/models/user.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  columns: string[] = ['name', 'surname', 'gender', 'email', 'dni', 'penalties', 'role'];
  users: User[] = [];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UsersService, private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isAdmin()) {
      this.getUsers();
    } else if (this.authService.isTeacher()) {
      this.getStudents();
    }
  }

  applyFilter(event: Event, dataSource: MatTableDataSource<User>) {
    const filter = (event.target as HTMLInputElement).value;
    dataSource.filter = filter.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.generateUserFromArray(response.body);
        this.setTableTools();
      });
  }

  getStudents() {
    this.userService.getStudents().subscribe(
      (response: any) => {
        this.generateUserFromArray(response.body);
        this.setTableTools();
      });
  }

  generateUserFromArray(anyArray: any) {
    this.users = [];
    for (let key in anyArray) {
      let user = new User();
      user.copyProperties(anyArray[key]);
      this.users.push(user);
    }
  }

  setTableTools() {
    this.dataSource.data = this.users as User[];
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator;
  }
}

