import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog'


@Component({
  selector: 'consult-opdsummary',
  templateUrl: 'consult-otsummary.component.html'
})

export class ConsultOtSummaryComponent {
  constructor( public dialogRef: MatDialogRef<ConsultOtSummaryComponent>) {}  
      
    onNoClick(): void {
        this.dialogRef.close();
      }


}
