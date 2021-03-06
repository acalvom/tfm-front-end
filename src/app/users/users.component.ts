import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../shared/services/users.service';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../shared/models/user.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  columns: string[] = [];
  users: User[] = [];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(protected userService: UsersService, public authService: AuthService, protected router: Router) {
  }

  ngOnInit() {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/users/admin']).then();
    } else if (this.authService.isTeacher()) {
      this.router.navigate(['/users/teacher']).then();
    }
  }

  applyFilter(event: Event, dataSource: MatTableDataSource<User>) {
    const filter = (event.target as HTMLInputElement).value;
    dataSource.filter = filter.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    this.dataSource.data = this.users;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  deleteUser(user: User) {
    //empty for injection
  }

  editUser(user: User) {
    //empty for injection
  }
}

