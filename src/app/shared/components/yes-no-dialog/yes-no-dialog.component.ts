import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
})
export class YesNoDialogComponent {

  constructor(public dialog: MatDialogRef<YesNoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public message: string) {
  }

  closeDialog(): void {
    this.dialog.close(false);
  }

  confirm(): void {
    this.dialog.close(true);
  }

}
