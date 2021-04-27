import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor() {
  }

  users: User[] = [];
  columns: string[] = ['name', 'email', 'dni', 'role'];
  dataSource = this.getStudents();

  getStudents() {
    this.users = [
      {name: 'a', surname: 'aa', dni: '1234A', gender: 'man', email: 'a@a', password: 'a', penalties: 0, role: 'teacher'},
      {name: 'b', surname: 'bb', dni: '1234B', gender: 'woman', email: 'b@b', password: 'b', penalties: 2, role: 'student'}
    ];
    return this.users;
  }

  ngOnInit(): void {
  }

}
