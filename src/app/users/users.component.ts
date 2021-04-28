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

  students: any[];
  teachers: any[] = [];
  columns: string[] = ['name','surname','gender','email', 'dni', 'penalties'];
  getStudentsStatusCode;


  getStudents() {
    this.userService.getStudents().subscribe(
      (value: any) => {
        this.students = value.body;
      });
  }

  getTeachers() {
    this.userService.getTeachers().subscribe(
      (value:any) => {
        this.teachers = value.body;
      });
  }


  ngOnInit(): void {
    this.getStudents();
    this.getTeachers();
  }

}
