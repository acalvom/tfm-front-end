import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Reserve} from '../shared/models/reserve.model';
import {ActivatedRoute} from '@angular/router';
import {ReservesService} from '../shared/services/reserves.service';
import {UsersService} from '../shared/services/users.service';
import {StudentBasic} from '../shared/models/student-basic.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-reserves-users',
  templateUrl: './reserves-users.component.html',
  styleUrls: ['./reserves-users.component.css']
})
export class ReservesUsersComponent implements OnInit {

  columns: string[] = ['name', 'surname', 'email', 'attendance'];
  students: StudentBasic[] = [];
  dataSource = new MatTableDataSource<StudentBasic>();
  code: string;
  reserves: Reserve[] = [];
  statusCode: number;

  constructor(private route: ActivatedRoute,
              private reservesService: ReservesService,
              private userService: UsersService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
    this.getReservesByCodeClass(this.code);
  }

  getReservesByCodeClass(code: string) {
    this.reservesService.getReservesByCodeClass(code).subscribe(
      (response: any) => {
        this.reserves = response.body;
        this.generateStudentBasicFromArray(this.reserves);
      }, error => {
        this.statusCode = error.status;
      });
  }

  getStudentInfo(email: string) {
    this.userService.getUserByEmail(email).subscribe(
      (response: any) => {
        let student = new StudentBasic();
        student.copyProperties(response.body[0]);
        this.students.push(student);
        this.dataSource.data = this.students;
      });
  }

  setPenalties(email: string, penalties: number) {
    this.userService.setPenalties(email, penalties).subscribe(() => {
      this.snackBar.open('Set', 'OK', {duration: 1000});
    }, (error) => {
      this.snackBar.open('Cannot set penalty: Error ' + error.status, 'OK', {duration: 3000});
    });
  }

  generateStudentBasicFromArray(anyArray: any) {
    this.students = [];
    for (let key in anyArray) {
      let studentEmail = anyArray[key].email_user;
      this.getStudentInfo(studentEmail);
    }
  }

}
