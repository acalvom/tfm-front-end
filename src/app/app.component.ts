import {Component} from '@angular/core';
import {UserRestService} from './shared/services/user-rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tfm-front-end';

  constructor(private userRestService: UserRestService) {
  }

  logoutUser(): void {
    this.userRestService.logoutUser();
  }

  isAuthenticated(): boolean {
    return this.userRestService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.userRestService.isAdmin();
  }

  isTeacher(): boolean {
    return this.userRestService.isTeacher();
  }

  isStudent(): boolean {
    return this.userRestService.isStudent();
  }
}
