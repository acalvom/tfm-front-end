import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './shared/material/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';

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
import {ChangePasswordDialogComponent} from './shared/components/change-password-dialog/change-password-dialog.component';
import {AddPhoneDialogComponent} from './shared/components/add-phone-dialog/add-phone-dialog.component';
import {WorkoutsComponent} from './workouts/workouts.component';
import {CreateWorkoutDialogComponent} from './shared/components/create-workout-dialog/create-workout-dialog.component';
import {BooleanYesNoPipe} from './shared/pipes/boolean-yes-no.pipe';
import {EditWorkoutDialogComponent} from './shared/components/edit-workout-dialog/edit-workout-dialog.component';
import {ClassesComponent} from './classes/classes.component';
import {CreateClassDialogComponent} from './shared/components/create-class-dialog/create-class-dialog.component';
import {EditClassDialogComponent} from './shared/components/edit-class-dialog/edit-class-dialog.component';

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
    ChangePasswordDialogComponent,
    AddPhoneDialogComponent,
    ProfileComponent,
    WorkoutsComponent,
    CreateWorkoutDialogComponent,
    EditUserDialogComponent,
    EditWorkoutDialogComponent,
    EditClassDialogComponent,
    BooleanYesNoPipe,
    ClassesComponent,
    CreateClassDialogComponent
  ],
  imports: [
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    HttpClientModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    YesNoDialogComponent,
    ChangePasswordDialogComponent,
    AddPhoneDialogComponent,
    CreateWorkoutDialogComponent,
    EditWorkoutDialogComponent,
    CreateClassDialogComponent,
    EditClassDialogComponent
  ]
})
export class AppModule {
}
