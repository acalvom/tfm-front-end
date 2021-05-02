import {Component, OnInit} from '@angular/core';
import {UsersComponent} from './users.component';
import {UsersService} from '../shared/services/users.service';
import {AuthService} from '../shared/services/auth.service';
import {User} from '../shared/models/user.model';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {YesNoDialogComponent} from '../shared/components/yes-no-dialog/yes-no-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EditUserDialogComponent} from '../shared/components/edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class AdminComponent extends UsersComponent implements OnInit {

  constructor(
    protected userService: UsersService,
    public authService: AuthService,
    protected router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
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

  deleteUser(user: User) {
    let data = 'Do you really want to delete user ' + user.email + ' ?';
    this.dialog.open(YesNoDialogComponent, {data: data}).afterClosed().subscribe(
      (remove: Boolean) => {
        if (remove) {
          this.userService.deleteUser(user.email).subscribe(() => {
            this.snackBar.open('User successfully deleted', 'OK', {duration: 5000});
            this.getUsers();
          }, (error) => {
            this.snackBar.open('User cannot be deleted: Error ' + error.status, 'OK', {duration: 5000});
          });
        }
      });
  }

  editUser(user: User) {
    let data = 'Edit User';
    this.dialog.open(EditUserDialogComponent, {data: data}).afterClosed().subscribe(
      () => console.log('hola'));
  }
}
