import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-warning-penalties-dialog',
  templateUrl: './warning-penalties-dialog.component.html',
})
export class WarningPenaltiesDialogComponent {

  constructor(public dialog: MatDialogRef<WarningPenaltiesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public penalties: number) {
  }

  closeDialog(): void {
    this.dialog.close(false);
  }
}
