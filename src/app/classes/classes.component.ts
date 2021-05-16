import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CreateClassDialogComponent} from '../shared/components/create-class-dialog/create-class-dialog.component';
import {Class} from '../shared/models/class.model';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  constructor(public authService: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  createClass() {
    console.log('create class works');
    this.dialog.open(CreateClassDialogComponent).afterClosed().subscribe(
      (newClass: Class) => {
        if (newClass) {
          console.log(newClass);
        }
      });
  }

}
