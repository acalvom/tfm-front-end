import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/user.model';
import {UsersService} from '../shared/services/users.service';
import {AuthService} from '../shared/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ChangePasswordDialogComponent} from '../shared/components/change-password-dialog/change-password-dialog.component';
import {AddPhoneDialogComponent} from '../shared/components/add-phone-dialog/add-phone-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UsersService, private authService: AuthService, public dialog: MatDialog,
              private snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    this.getUserInformation();
  }

  getUserInformation() {
    this.userService.getUserByEmail(this.authService.getLoggedUser()).subscribe(
      (response: any) => {
        this.user = response.body[0];
      });
  }

  changePassword() {
    this.dialog.open(ChangePasswordDialogComponent, {data: this.user})
      .afterClosed().subscribe(
      (passwords: JSON) => {
        if (passwords) {
          this.userService.changePassword(this.user.email, passwords).subscribe(() => {
            this.snackBar.open('Password successfully changed', 'OK', {duration: 5000});
          }, (error) => {
            this.snackBar.open('Password cannot be modified: Error ' + error.status, 'OK', {duration: 5000});
          });
        }
      });
  }

  addPhone() {
    this.dialog.open(AddPhoneDialogComponent)
      .afterClosed().subscribe(
      (phone: string) => {
        this.userService.addPhone(this.user.email, phone).subscribe(() => {
          this.getUserInformation();
          this.snackBar.open('Phone successfully added', 'OK', {duration: 5000});
        }, (error) => {
          this.snackBar.open('Phone cannot be added: Error ' + error.status, 'OK', {duration: 5000});
        });
      });
  }
}
