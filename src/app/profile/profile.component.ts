import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/user.model';
import {UsersService} from '../shared/services/users.service';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UsersService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.setFormValues();
  }

  setFormValues() {
    this.userService.getUserByEmail(this.authService.getLoggedUser()).subscribe(
      (response: any) => {
        this.user = response.body[0];
      });
  }
}
