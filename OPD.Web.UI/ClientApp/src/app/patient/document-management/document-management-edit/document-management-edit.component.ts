import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { documentManagementModel } from '../../models/documentManagementModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewPatientService } from '../../newPatient.service';

@Component({
  selector: 'app-document-management-edit',
  templateUrl: './document-management-edit.component.html',
  styleUrls: ['./document-management-edit.component.css']
})
export class DocumentManagementEditComponent implements OnInit {

  DocumentManagementEditForm: FormGroup;

  DocumentManagementEditModel: documentManagementModel = new documentManagementModel;

  facilityId: number = 0;
  patientId: number = 1;
  recordby: any[] = [];
  visitDandT: any[] = [];

  constructor(public fb: FormBuilder, public serv: NewPatientService, public dialogRef: MatDialogRef<DocumentManagementEditComponent>, @Inject(MAT_DIALOG_DATA) public data : any) {
   
  }

  ngOnInit() {
    this.DocumentManagementEditForm = this.fb.group({
      DocumentID: [''],
      VisitID: [''],
      RecordedDate: [''],
      RecordedBy: [''],
      DocumentName: [''],
      DocumentType: [''],
      DocumentNotes: [''],
      /*Createddate: [''],
      CreatedBy: [''],
      ModifiedDate: [''],
      ModifiedBy:[''],*/
      RecordedTime: [''],
      PatientName: [''],
      visitDateandTime: [''],
      recordedDuring:['']

    })
    this.setDocumentVal();
    this.getProviderName();
    this.getvisitDate();
  }

  setDocumentVal() {
    this.DocumentManagementEditForm.get('DocumentID').setValue(this.data.DocumentID);
    this.DocumentManagementEditForm.get('VisitID').setValue(this.data.VisitID);
    this.DocumentManagementEditForm.get('RecordedDate').setValue(new Date(this.data.RecordedDate));
    this.DocumentManagementEditForm.get('RecordedTime').setValue(new Date(this.data.RecordedDate).toLocaleString([], { hour12: true, hour: '2-digit', minute: '2-digit'}));
    this.DocumentManagementEditForm.get('RecordedBy').setValue(this.data.RecordedBy);
    this.DocumentManagementEditForm.get('DocumentName').setValue(this.data.DocumentName);
    this.DocumentManagementEditForm.get('DocumentType').setValue(this.data.DocumentType);
    this.DocumentManagementEditForm.get('DocumentNotes').setValue(this.data.DocumentNotes);
    this.DocumentManagementEditForm.get('RecordedTime').setValue(this.data.RecordedTime);
    this.DocumentManagementEditForm.get('PatientName').setValue(this.data.PatientName);
    this.DocumentManagementEditForm.get('visitDateandTime').setValue(this.data.visitDateandTime);
    this.DocumentManagementEditForm.get('recordedDuring').setValue(this.data.recordedDuring);
  }

  updateDocumentVal() {
    this.DocumentManagementEditModel.DocumentID = this.data.DocumentID;
    this.DocumentManagementEditModel.VisitID = this.data.VisitID;
    this.DocumentManagementEditModel.RecordedDate = this.DocumentManagementEditForm.get('RecordedDate').value;
    this.DocumentManagementEditModel.RecordedBy = this.DocumentManagementEditForm.get('RecordedBy').value;
    this.DocumentManagementEditModel.DocumentName = this.DocumentManagementEditForm.get('DocumentName').value;
    this.DocumentManagementEditModel.DocumentType = this.DocumentManagementEditForm.get('DocumentType').value;
    this.DocumentManagementEditModel.DocumentNotes = this.DocumentManagementEditForm.get('DocumentNotes').value;
    this.DocumentManagementEditModel.RecordedTime = this.DocumentManagementEditForm.get('RecordedTime').value;
    this.DocumentManagementEditModel.PatientName = this.data.PatientName;  //this.DocumentManagementEditForm.get('PatientName').value;
    this.DocumentManagementEditModel.visitDateandTime = this.DocumentManagementEditForm.get('visitDateandTime').value;
    this.DocumentManagementEditModel.recordedDuring = this.DocumentManagementEditForm.get('recordedDuring').value;

    this.serv.addUpdateDocumentManagement(this.DocumentManagementEditModel).then(data => {
      this.dialogClose();
      this.dialogRef.close("update");
    })
  }

  getProviderName() {
    this.serv.GetProviderNames(this.facilityId).then(res => {
      this.recordby = res;
      
    })
  }

  getvisitDate() {
    this.serv.GetVisitsForPatient(this.patientId).then(res => {
      
      for (var i = 0; i < res.length; i++) {
        this.visitDandT[i] = res[i].VisitDateandTime;
      }
    });

  }

  dialogClose(): void {
    this.dialogRef.close();
  }
}
