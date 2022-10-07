import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BMSMessageBoxColorMode, BMSMessageBoxMode } from "src/app/ux/bmsmsgbox/bmsmsgbox.component";
import { UtilService } from "../../../../core/util.service";
import { ConfigurationService } from "../../../configuration.service";
import { billingStatusMasterModel } from "../../../Models/billingStatusMasterModel";

@Component({
    selector: 'billingStatus-add',
    templateUrl: './billingStatus-add.component.html',
    styleUrls: ['./billingStatus-add.component.css']
})

export class BillingStatusAddComponent implements OnInit {


    //need to change alll........

    billingStatusMasterModel:billingStatusMasterModel=new billingStatusMasterModel();

    //#region "Property Declaration"
    addBillingStatusForm: FormGroup | any;
    BillingstatusId: number = 0;
    showName: string = "Add";
    isReadOnly: boolean = false;
    //#endregion

    //#region "constructor"
    constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<BillingStatusAddComponent>, @Inject (MAT_DIALOG_DATA) public data : any, public configurationService: ConfigurationService, private util: UtilService) { }
    //#endregion

    // #region "ngOnInit"
    ngOnInit() {
        this.addBillingStatusForm = this.fb.group({
            BillingStatusCode: ["", Validators.required],
            BillingStatusDescription: ["", Validators.required],
            OrderNo: ["", Validators.required],

        });
        this.setBillingStatusData();

        if (this.data != null) {
            this. BillingstatusId = this.data.BillingMasterStatusID;
            this.showName = "Edit";
            this.isReadOnly = true;
        }
    }
    // #endregion

    //#region "set Values For Form"
    setBillingStatusData() {
        if (this.data) {
            
            this.addBillingStatusForm.get('BillingStatusCode').setValue(this.data.BillingMasterStatusCode);
            this.addBillingStatusForm.get('BillingStatusDescription').setValue(this.data.BillingMasterStatusDescription);
            this.addBillingStatusForm.get('OrderNo').setValue(this.data.OrderNo);
        }
    }
    //#endregion

    //#region "Edit/Update Admission Type Data"
    addbillingStatus() {
        if (this.addBillingStatusForm.valid) {
            this.billingStatusMasterModel.BillingMasterStatusId = this.BillingstatusId;
            this.billingStatusMasterModel.BillingMasterStatusCode = this.addBillingStatusForm.get("BillingStatusCode").value;
            this.billingStatusMasterModel.BillingMasterStatusDescription = this.addBillingStatusForm.get("BillingStatusDescription").value;
            this.billingStatusMasterModel.OrderNo = this.addBillingStatusForm.get("OrderNo").value;
            this.configurationService.addUpdateBillingStatus(this.billingStatusMasterModel).then(res => {
                if (res) {
                    this.util.showMessage("", "BillingStatus details saved successfully", BMSMessageBoxColorMode.Information, BMSMessageBoxMode.MessageBox).then(res => {

                    });
                    this.dialogRef.close("Updated");
                }
            });
        }
    }
    //#endregion

    //#region "clear the Form values"
    clearForm() {
        this.addBillingStatusForm.reset();
        this.setBillingStatusData();
    }
    //#endregion 

    //#region "To close the Pop up"
    //To close the Pop up
    dialogClose(): void {
        this.dialogRef.close();
    }
    //#endregion    

}