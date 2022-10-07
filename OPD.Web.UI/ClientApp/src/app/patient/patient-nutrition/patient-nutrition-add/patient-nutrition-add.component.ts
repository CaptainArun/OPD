import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NutritionAssessmentModel } from "../../../triage/models/nutritionAssessmentModel";
import { TriageService } from "../../../triage/triage.service";
import { CustomHttpService } from "../../../core/custom-http.service";
import { NewPatientService } from "../../newPatient.service";
import { UtilService } from "../../../core/util.service";
import {
  BMSMessageBoxColorMode,
  BMSMessageBoxMode,
} from "../../../ux/bmsmsgbox/bmsmsgbox.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-patient-nutrition-add",
  templateUrl: "./patient-nutrition-add.component.html",
  styleUrls: ["./patient-nutrition-add.component.css"],
})
export class PatientNutritionAddComponent implements OnInit {
  PatientNutritionForm: FormGroup;
  patientNutritionModel: NutritionAssessmentModel = new NutritionAssessmentModel();
  patientId: number = 1;
  visitId: number;
  patientById :any[] = [];
  patientvisitHistoryList: any;
  visitIntake: any;
  recordedDuring: any = "";
  visitID: number;
  visitDandt: any[] = [];
  facilityId: number = 0;
  recordby: any[] = [];
  cpt: any;
  getDate: any;
  getTimeHH: any;
  getTimeMin: any;
  getDateAndTime: any;
  foodIntakeTypes: any;
  IntakeCategoryValue: any;
  EatRegularlyvalue: any;
  constructor(
    public triageSvc: TriageService,
    public fb: FormBuilder,
    public customHttpSvc: CustomHttpService,
    public dialog: MatDialog,
    public newPatientSvc: NewPatientService,
    public dialogRef: MatDialogRef<PatientNutritionAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private util: UtilService
  ) { }
  ngOnInit() {
    this.PatientNutritionForm = this.fb.group({
      NutritionAssessmentID: [""],
      VisitId: [""],
      VisitDateandTime: ["", Validators.required],
      RecordedDate: [new Date(), Validators.required],
      RecordedTime: [new Date().toLocaleString([], { hour12: true, hour: '2-digit', minute: '2-digit'}), Validators.required],
      recordedDuring: ["", Validators.required],
      RecordedBy: ["", Validators.required],
      PatientId: [""],
      IntakeCategory: [""],
      FoodIntakeTypeID: [""],
      EatRegularly: [""],
      RegularMeals: [""],
      Carvings: [""],
      DislikedIntake: [""],
      FoodAllergies: [""],
      Notes: [""],
      FoodName: [""],
      Units: [""],
      Frequency: [""],
      NutritionNotes: [""],
    });
    this.customHttpSvc.getDbName(localStorage.getItem("DatabaseName"));
    this.getVisitForPatient();
    this.getProviderNames();
    this.bindAllFoodIntakeTypes();
    this.getIntakeCategoryValue();
    this.getEatRegularlyvalue();
  }
  getEatRegularlyvalue() {
    this.triageSvc.getEatRegularlyvalue().then((res) => {
      this.EatRegularlyvalue = res;
    });
  }
  getIntakeCategoryValue() {
    this.triageSvc.getIntakeCategoryValue().then((res) => {
      this.IntakeCategoryValue = res;
    });
  }
  getVisitForPatient() {
    this.newPatientSvc
      .GetVisitsForPatient(this.newPatientSvc.patientId)
      .then((res) => {
        for (var i = 0; i < res.length; i++) {
          this.visitDandt[i] = res[i].VisitDateandTime;
          this.visitID = res[i].VisitId;
        }
      });
  }
  RecordedDuring(index: any) {
    this.triageSvc
      .getVisitForPatient(this.newPatientSvc.patientId)
      .then((data) => {
        for (var i = 0; i < data.length; i++) {
          if (i == index) {
            this.recordedDuring = data[i].recordedDuring;
            this.visitID = data[i].VisitId;
            this.PatientNutritionForm.get("recordedDuring").setValue(this.recordedDuring);
          }
        }
      });
  }
  getProviderNames() {
    this.triageSvc.getProviderNames(this.facilityId).then((res) => {
      this.recordby = res;
    });
  }

  bindAllFoodIntakeTypes() {
    this.triageSvc.getAllFoodIntakeTypes().then((data) => {
      this.foodIntakeTypes = data;
    });
  }

  sendDateWithTime() {
    this.getDate = new Date(
      this.PatientNutritionForm.get("RecordedDate").value
    );

    if (this.PatientNutritionForm.get("RecordedDate").value != "") {
      if (
        this.PatientNutritionForm.get("RecordedTime")
          .value.toString()
          .toLowerCase()
          .split(" ")[1] == "pm"
      ) {
        if (
          parseInt(
            this.PatientNutritionForm.get("RecordedTime")
              .value.toString()
              .split(" ")[0]
              .toString()
              .split(":")[0]
          ) == 12
        ) {
          this.getTimeHH = 12;
        } else {
          this.getTimeHH =
            parseInt(
              this.PatientNutritionForm.get("RecordedTime")
                .value.toString()
                .split(" ")[0]
                .toString()
                .split(":")[0]
            ) + 12;
        }
      } else if (
        this.PatientNutritionForm.get("RecordedTime")
          .value.toString()
          .toLowerCase()
          .split(" ")[1] == "am"
      ) {
        if (
          parseInt(
            this.PatientNutritionForm.get("RecordedTime")
              .value.toString()
              .split(" ")[0]
              .toString()
              .split(":")[0]
          ) == 12
        ) {
          this.getTimeHH = 0;
        } else {
          this.getTimeHH = parseInt(
            this.PatientNutritionForm.get("RecordedTime")
              .value.toString()
              .split(" ")[0]
              .toString()
              .split(":")[0]
          );
        }
      }
      this.getTimeMin = parseInt(
        this.PatientNutritionForm.get("RecordedTime")
          .value.toString()
          .split(" ")[0]
          .toString()
          .split(":")[1]
      );
      this.getDate.setHours(this.getTimeHH, this.getTimeMin, 0, 0);
    }

    this.getDateAndTime = this.getDate;
  }

  addUpdateNutrition() {
    this.sendDateWithTime();
    this.patientNutritionModel.NutritionAssessmentID = 0;
    this.patientNutritionModel.VisitId = this.visitID;
    this.patientNutritionModel.PatientId = this.newPatientSvc.patientId;
    this.patientNutritionModel.RecordedDate = this.getDateAndTime;
    this.patientNutritionModel.recordedDuring = this.recordedDuring;
    this.patientNutritionModel.RecordedBy =
      this.PatientNutritionForm.get("RecordedBy").value;
    this.patientNutritionModel.IntakeCategory =
      this.PatientNutritionForm.get("IntakeCategory").value;
    this.patientNutritionModel.FoodIntakeTypeID =
      this.PatientNutritionForm.get("FoodIntakeTypeID").value;
    this.patientNutritionModel.EatRegularly =
      this.PatientNutritionForm.get("EatRegularly").value;
    this.patientNutritionModel.RegularMeals =
      this.PatientNutritionForm.get("RegularMeals").value;
    this.patientNutritionModel.Carvings =
      this.PatientNutritionForm.get("Carvings").value;
    this.patientNutritionModel.DislikedIntake =
      this.PatientNutritionForm.get("DislikedIntake").value;
    this.patientNutritionModel.FoodAllergies =
      this.PatientNutritionForm.get("FoodAllergies").value;
    this.patientNutritionModel.Notes =
      this.PatientNutritionForm.get("Notes").value;
    this.patientNutritionModel.FoodName =
      this.PatientNutritionForm.get("FoodName").value;
    this.patientNutritionModel.Units =
      this.PatientNutritionForm.get("Units").value;
    this.patientNutritionModel.Frequency = parseInt(
      this.PatientNutritionForm.get("Frequency").value
    );
    this.patientNutritionModel.NutritionNotes =
      this.PatientNutritionForm.get("NutritionNotes").value;
    this.newPatientSvc
      .addUpdateNutrition(this.patientNutritionModel)
      .then((data) => {
        this.util
          .showMessage(
            "",
            "Nutrition details saved successfully",
            BMSMessageBoxColorMode.Information,
            BMSMessageBoxMode.MessageBox
          )
          .then((res) => { });
        this.dialogRef.close("update");
      });
  }

  cancelForm() {
    this.PatientNutritionForm.reset();
    this.recordedDuring = "";
    this.PatientNutritionForm.get("RecordedTime").setValue(new Date().toLocaleString([], { hour12: true, hour: '2-digit', minute: '2-digit'}));
    this.PatientNutritionForm.get("RecordedDate").setValue(new Date());
  }
  dialogClose(): void {
    this.dialogRef.close();
  }
}
