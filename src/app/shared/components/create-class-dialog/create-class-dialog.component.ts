import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Class} from '../../models/class.model';

@Component({
  selector: 'app-create-class-dialog',
  templateUrl: './create-class-dialog.component.html',
  styleUrls: ['../dialog-style.css']
})
export class CreateClassDialogComponent implements OnInit {

  createClassFormGroup = new FormGroup({
    day: new FormControl('', [Validators.required])
  });

  constructor(public dialog: MatDialogRef<CreateClassDialogComponent>) {
  }

  ngOnInit(): void {
  }

  create() {
    let newClass = new Class();
    newClass.copyProperties(this.createClassFormGroup.value);
    console.log(newClass);
    this.dialog.close(newClass);
  }

  close() {
    this.dialog.close();
  }

}
