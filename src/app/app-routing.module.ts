import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {UsersComponent} from './users/users.component';
import {AdminComponent} from './users/admin.component';
import {TeacherComponent} from './users/teacher.component';
import {ProfileComponent} from './profile/profile.component';
import {WorkoutsComponent} from './workouts/workouts.component';
import {ClassesComponent} from './classes/classes.component';
import {ReservesUsersComponent} from './reserves-users/reserves-users.component';
import {NewsComponent} from './news/news.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/admin', component: AdminComponent},
  {path: 'users/teacher', component: TeacherComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'workouts', component: WorkoutsComponent},
  {path: 'classes', component: ClassesComponent},
  {path: 'reserves/:code', component: ReservesUsersComponent},
  {path: 'news', component: NewsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
