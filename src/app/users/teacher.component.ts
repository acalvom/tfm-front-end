import {Component, OnInit} from '@angular/core';
import {UsersComponent} from './users.component';
import {UsersService} from '../shared/services/users.service';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class TeacherComponent extends UsersComponent implements OnInit {

  constructor(protected userService: UsersService, public authService: AuthService, protected router: Router) {
    super(userService, authService, router);
    this.columns = ['name', 'surname', 'gender', 'email', 'phone', 'dni', 'penalties', 'role'];
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.userService.getStudents().subscribe(
      (response: any) => {
        this.generateUserFromArray(response.body);
        this.setTableTools();
      });
  }

}
