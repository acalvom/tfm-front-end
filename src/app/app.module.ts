import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './shared/material/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

import {AuthService} from './shared/services/auth.service';
import {UsersComponent} from './users/users.component';
import {AdminComponent} from './users/admin.component';
import {TeacherComponent} from './users/teacher.component';
import {YesNoDialogComponent} from './shared/components/yes-no-dialog/yes-no-dialog.component';
import {EditUserDialogComponent} from './shared/components/edit-user-dialog/edit-user-dialog.component';
import {ProfileComponent} from './profile/profile.component';
import {ChangePasswordPhoneDialogComponent} from './shared/components/change-password-phone-dialog/change-password-phone-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    AdminComponent,
    TeacherComponent,
    YesNoDialogComponent,
    EditUserDialogComponent,
    ChangePasswordPhoneDialogComponent,
    ProfileComponent
  ],
  imports: [
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    YesNoDialogComponent,
    ChangePasswordPhoneDialogComponent
  ]
})
export class AppModule {
}
