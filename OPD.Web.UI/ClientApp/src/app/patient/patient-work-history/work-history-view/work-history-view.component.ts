import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-work-history-view',
  templateUrl: './work-history-view.component.html',
  styleUrls: ['./work-history-view.component.css']
})
export class WorkHistoryViewComponent implements OnInit {
  PatientWorkHistoryViewForm: FormGroup;

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<WorkHistoryViewComponent>, @Inject(MAT_DIALOG_DATA) public data : any) {
    
  }

  ngOnInit() {
    this.PatientWorkHistoryViewForm = this.fb.group({
     RecordedDate: [''],
      RecordedBy: [''],
      RecordedTime: [''],
      visitDateandTime: [''],
      recordedDuring: ['']
    })
    this.PatientWorkHistoryViewForm.disable();
    this.setView();
  }

  setView() {
    this.PatientWorkHistoryViewForm.get('RecordedDate').setValue(new Date(this.data.RecordedDate));
    this.PatientWorkHistoryViewForm.get('RecordedTime').setValue(new Date(this.data.RecordedDate).toLocaleString([], { hour12: true, hour: '2-digit', minute: '2-digit'}));
    this.PatientWorkHistoryViewForm.get('RecordedBy').setValue(this.data.RecordedBy);
    this.PatientWorkHistoryViewForm.get('visitDateandTime').setValue(this.data.visitDateandTime);
    this.PatientWorkHistoryViewForm.get('recordedDuring').setValue(this.data.recordedDuring);
  }
  dialogClose(): void {
    this.dialogRef.close();
  }
  
}
