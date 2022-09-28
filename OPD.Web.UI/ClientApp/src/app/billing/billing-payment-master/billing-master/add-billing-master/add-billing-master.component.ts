import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { BMSMessageBoxColorMode, BMSMessageBoxMode } from "src/app/ux/bmsmsgbox/bmsmsgbox.component";
import { CustomHttpService } from "../../../../core/custom-http.service";
import { UtilService } from "../../../../core/util.service";
import { billingService } from "../../../billing.service";
import { BillingMasterModel } from "../../../models/BillingMasterModel";

@Component({
  selector: 'app-add-Billing-master',
  templateUrl: './add-Billing-master.component.html',
  styleUrls: ['./add-Billing-master.component.css']

})
export class AddBillingMasterComponent implements OnInit,AfterViewInit,OnDestroy {

  //#region "Property Declaration"
  MasterBillingForm: FormGroup | any;
  BillMasterModel: BillingMasterModel = new BillingMasterModel();
  DepartmentInfo: any;
  DeptId: any;
  StatusData: any;
  subMasterdata: any;
  @ViewChild('autoCompleteDepartment', { static: false, read: MatAutocompleteTrigger })DepartmentAutotrigger: MatAutocompleteTrigger | any;
  //#endregion

  //#region "constructor"
  constructor(private fb: FormBuilder, public dialog: MatDialogRef<AddBillingMasterComponent>, private billingSvc: billingService, public customhttp: CustomHttpService, private router: Router, private util: UtilService, @Inject(MAT_DIALOG_DATA) public data : any,) { }
  //#endregion

  //#region "ngOnInit"
  ngOnInit() {
    this.MasterBillingForm = this.fb.group({
      DepartmentID: ['',Validators.required],
      OrderNo: ['',Validators.required],
      BillingTypeDesc: ['',Validators.required],
      MasterBillingType: ['',Validators.required],
      Status: ['',Validators.required],
      AllowSubMaster: [''],
    });
    this.customhttp.getDbName(localStorage.getItem('DatabaseName'));
    this.GetDepartmentCodeList();
    this.getStatus();
  }
  //#endregion

  //#region "Getting-Status Data"
  getStatus() {
    this.billingSvc.GetBillingStatus().then(data => {
      this.StatusData = data;
    });
  }
  //#endregion


  //#region "DepartmentID"

  DepartmentId(DepartmentID : any) {
    this.DeptId = DepartmentID;
    this.DepartmentInfo = null;
  }

  //#endregion


  //#region "DepartmentValue"
  GetDepartmentCodeList() {
    this.MasterBillingForm.get('DepartmentID').valueChanges.subscribe((key: string) => {
      if (key != null) {
        if (key.length > 2) {
          this.billingSvc.GetDepartmentsList(key).then(data => {
            this.DepartmentInfo = data;
          })
        }
        else{
          this.DepartmentInfo = null;
        }
      }
      else{
        this.DepartmentInfo = null;
      }
    })
  }
  //#endregion

ngAfterViewInit(){

  this.DepartmentAutotrigger.panelClosingActions.subscribe((e:any) => {    
    if (!(e && e.source)) {      
      this.MasterBillingForm.get('DepartmentID').setValue('');
    }
  });

}
  //#region "submitData"
  submitData() {
    if (this.MasterBillingForm.valid) {
      this.BillMasterModel.BillingMasterID = 0;
      this.BillMasterModel.MasterBillingType = this.MasterBillingForm.get('MasterBillingType').value;
      this.BillMasterModel.AllowSubMaster = this.subMasterdata;
      this.BillMasterModel.DepartmentID = this.DeptId;
      this.BillMasterModel.BillingTypeDesc = this.MasterBillingForm.get('BillingTypeDesc').value;
      this.BillMasterModel.OrderNo = parseInt(this.MasterBillingForm.get('OrderNo').value);
      this.BillMasterModel.Status = this.MasterBillingForm.get('Status').value;
      this.billingSvc.AddUpdateBillingMasterData(this.BillMasterModel).then(data => {
        this.util.showMessage('', 'Billing Master details saved successfully', BMSMessageBoxColorMode.Information, BMSMessageBoxMode.MessageBox).then(
          (res) => {
            if (res === true) {
              this.dialog.close("Update");
            }
          }
        );
      });
    }
  }
  //#endregion

  //#region "reset"
  Clear() {
    this.MasterBillingForm.reset();
  }
  //#endregion
ngOnDestroy(){
  
}

  //#region "dialog-close"
  close() {
    this.dialog.close();
  }
  //#endregion

  //#region "AllowSubMaster "
  AllowSubMaster() {
    if (this.MasterBillingForm.get('AllowSubMaster').value) {
      this.subMasterdata = true;
    }
    else {
      this.subMasterdata = false;
    }
  }
  //#endregion

}
