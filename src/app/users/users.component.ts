import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/user.model';
import {UsersService} from '../shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UsersService) {
  }

  students: User[] = [];
  teachers: User[] = [];
  columns: string[] = ['name', 'email', 'dni', 'role'];
  getStudentsStatusCode;

  getStudents() {
    this.userService.getStudents().subscribe(
      (value: User[]) => {
        this.students = value;
      });
  }

  getTeachers() {
    this.userService.getTeachers().subscribe(
      (value: User[]) => {
        this.teachers = value;
      });
  }


  ngOnInit(): void {
    this.getStudents();
    this.getTeachers();
  }

}
