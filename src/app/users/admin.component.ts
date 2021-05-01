import {Component, OnInit} from '@angular/core';
import {UsersComponent} from './users.component';
import {UsersService} from '../shared/services/users.service';
import {AuthService} from '../shared/services/auth.service';
import {User} from '../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class AdminComponent extends UsersComponent implements OnInit {

  constructor(protected userService: UsersService, public authService: AuthService, protected router: Router) {
    super(userService, authService, router);
    this.columns = ['name', 'surname', 'gender', 'email', 'dni', 'penalties', 'role', 'action'];
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.generateUserFromArray(response.body);
        this.setTableTools();
      });
  }

  deleteContact(user: User) {
    console.log(JSON.stringify(user));
  }
}
