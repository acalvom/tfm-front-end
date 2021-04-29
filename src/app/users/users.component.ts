import {Component, OnInit, ViewChild} from '@angular/core';
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

  columns: string[] = ['name', 'surname', 'gender', 'email', 'dni', 'penalties', 'role'];
  users: User[] = [];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UsersService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  applyFilter(event: Event, dataSource: MatTableDataSource<User>) {
    const filter = (event.target as HTMLInputElement).value;
    dataSource.filter = filter.trim().toLowerCase();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.generateUserFromArray(response.body);
        this.dataSource.data = this.users as User[];
        this.dataSource.sort = this.sort as MatSort;
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
}

