import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-patient-funtion-view',
  templateUrl: './patient-funtion-view.component.html',
  styleUrls: ['./patient-funtion-view.component.css']
})
export class PatientFuntionViewComponent implements OnInit {
  funcForm: FormGroup;
  recordeddate: any;
  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<PatientFuntionViewComponent>, @Inject(MAT_DIALOG_DATA) public data : any) { }

  ngOnInit() {
    this.funcForm = this.fb.group({
      RecordedDate: [''],
      RecordedBy: [''],
      recordedDuring: [''],
      RecordedTime: [''],
      visitDateandTime: [''],
    })
    this.funcForm.disable();
    this.setNutriView();


  }
  setNutriView() {
    this.funcForm.get('RecordedDate').setValue(new Date(this.data.RecordedDate));
    this.funcForm.get('RecordedTime').setValue(new Date(this.data.RecordedDate).toLocaleString([], { hour12: true, hour: '2-digit', minute: '2-digit'}));
    this.funcForm.get('RecordedBy').setValue(this.data.RecordedBy);
    this.funcForm.get('visitDateandTime').setValue(this.data.visitDateandTime);
    this.funcForm.get('recordedDuring').setValue(this.data.recordedDuring);
    this.recordeddate = (new Date(this.data.RecordedDate).toLocaleDateString());

  }

  dialogClose(): void {
    this.dialogRef.close();
  }
}
