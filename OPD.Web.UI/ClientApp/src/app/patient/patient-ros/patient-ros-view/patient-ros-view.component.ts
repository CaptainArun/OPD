import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { PatientROSModel } from "../../../triage/models/patientROSModel";
import { CustomHttpService } from "../../../core/custom-http.service";
import { NewPatientService } from "../../newPatient.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TriageService } from "../../../triage/triage.service";

@Component({
  selector: "app-patient-ros-view",
  templateUrl: "./patient-ros-view.component.html",
  styleUrls: ["./patient-ros-view.component.css"],
})
export class PatientROSViewComponent implements OnInit {
  patientROSform: FormGroup;
  patientROSmodel: PatientROSModel = new PatientROSModel();
  patientId: number = 1;
  visitId: number;
  patientById : any[] = [];
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
  recordeddate: any;
  disable: boolean = true;
  StaticDisabled: boolean = true;
  
  constructor(
    public customHttpSvc: CustomHttpService,
    public fb: FormBuilder,
    public newpatsvc: NewPatientService,
    public dialogRef: MatDialogRef<PatientROSViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public triageSvc: TriageService
  ) {
  }

  ngOnInit() {
    this.patientROSform = this.fb.group({
      PatientID: [""],
      VisitID: [""],
      ROSID: [""],
      VisitDate: [""],
      RecordedDate: [""],
      RecordedTime: [""],
      recordedDuring: [""],
      RecordedBy: [""],
      visitDateandTime: [""],

      //ROSGeneral
      Weightlossorgain: [""],
      Feverorchills: [""],
      Troublesleeping: [""],
      Fatigue: [""],
      GeneralWeakness: [""],
      GeneralOthers: [""],
      GeneralothersComments: [""],

      //ROS Skin
      Rashes: [""],
      SkinItching: [""],
      Colorchanges: [""],
      SkinLumps: [""],
      Dryness: [""],
      Hairandnailchanges: [""],
      SkinOthers: [""],
      SkinothersComments: [""],

      //ROSHead
      Headache: [""],
      Headinjury: [""],
      Others: [""],
      HeadothersComments: [""],

      //ROS Ears
      Decreasedhearing: [""],
      Earache: [""],
      Ringinginears: [""],
      Drainage: [""],
      EarOthers: [""],
      EarothersComments: [""],

      //ROS Eyes
      Vision: [""],
      Blurryordoublevision: [""],
      Cataracts: [""],
      Glassesorcontacts: [""],
      Flashinglights: [""],
      Lasteyeexam: [""],
      EyePain: [""],
      Specks: [""],
      Redness: [""],
      Glaucoma: [""],
      EyeOthers: [""],
      EyesothersComments: [""],

      //ROS Nose
      Stuffiness: [""],
      NoseItching: [""],
      Nosebleeds: [""],
      Discharge: [""],
      Hayfever: [""],
      Sinuspain: [""],
      NoseOthers: [""],
      NoseothersComments: [""],

      //ROS Throat
      Teeth: [""],
      Soretongue: [""],
      Thrush: [""],
      Gums: [""],
      Drymouth: [""],
      Nonhealingsores: [""],
      Bleeding: [""],
      Sorethroat: [""],
      Sinus: [""],
      Lastdentalexam: [""],
      Dentures: [""],
      Hoarseness: [""],
      ThroatOthers: [""],
      ThroatothersComments: [""],

      //ROS Neck
      NeckLumps: [""],
      NeckPain: [""],
      Swollenglands: [""],
      Stiffness: [""],
      NeckOthers: [""],
      NeckothersComments: [""],

      //ROS Respiratory
      Cough: [""],
      Coughingupblood: [""],
      Wheezing: [""],
      Sputum: [""],
      Shortnessofbreath: [""],
      Painfulbreathing: [""],
      RespiratoryOthers: [""],
      Respiratoryotherscomments: [""],

      //ROS Neurologic
      Dizziness: [""],
      Weakness: [""],
      Tremor: [""],
      Fainting: [""],
      Numbness: [""],
      Seizures: [""],
      Tingling: [""],
      NeurologicOthers: [""],
      Neurologicotherscomments: [""],

      //ROS Hematologic
      Easeofbruising: [""],
      Easeofbleeding: [""],
      HematologicOthers: [""],
      Hematologicotherscomments: [""],

      //ROS Psychiatric
      Nervousness: [""],
      Memoryloss: [""],
      Stress: [""],
      Depression: [""],
      PsychiatricOthers: [""],
      Psychiatricotherscomments: [""],
    });

    this.customHttpSvc.getDbName(localStorage.getItem("DatabaseName"));
    this.getVisitForPatient();
    this.getProviderNames();
    this.setPatientROS();
    this.patientROSform.disable();
  }

  getVisitForPatient() {
    this.newpatsvc.GetVisitsForPatient(this.patientId).then((res) => {
      for (var i = 0; i < res.length; i++) {
        this.visitDandt[i] = res[i].VisitDateandTime;
        this.visitID = res[i].VisitId;
      }
    });
  }

  RecordedDuring(index: any) {
    this.newpatsvc.GetVisitsForPatient(this.patientId).then((data) => {
      for (var i = 0; i < data.length; i++) {
        if (i == index) {
          this.recordedDuring = data[i].recordedDuring;
          //this.visitID = data[i].VisitId;
        }
      }
    });
  }

  getProviderNames() {
    this.newpatsvc.GetProviderNames(this.facilityId).then((res) => {
      this.recordby = res;
    });
  }

  setPatientROS() {
    this.patientROSform.get("ROSID").setValue(this.data.ROSID);
    this.patientROSform.get("PatientID").setValue(this.data.PatientID);
    this.patientROSform.get("VisitID").setValue(this.data.VisitID);
    this.patientROSform
      .get("visitDateandTime")
      .setValue(this.data.visitDateandTime);
    this.patientROSform
      .get("RecordedDate")
      .setValue(new Date(this.data.RecordedDate));
    this.patientROSform.get("RecordedBy").setValue(this.data.RecordedBy);
    this.patientROSform
      .get("RecordedTime")
      .setValue(new Date(this.data.RecordedDate).toLocaleString([], { hour12: true, hour: '2-digit', minute: '2-digit'}));
    this.patientROSform
      .get("recordedDuring")
      .setValue(this.data.recordedDuring);

    //General
    this.patientROSform
      .get("Weightlossorgain")
      .setValue(this.data.Weightlossorgain);
    this.patientROSform.get("Feverorchills").setValue(this.data.Feverorchills);
    this.patientROSform
      .get("Troublesleeping")
      .setValue(this.data.Troublesleeping);
    this.patientROSform.get("Fatigue").setValue(this.data.Fatigue);
    this.patientROSform
      .get("GeneralWeakness")
      .setValue(this.data.GeneralWeakness);
    this.patientROSform.get("GeneralOthers").setValue(this.data.GeneralOthers);
    this.patientROSform
      .get("GeneralothersComments")
      .setValue(this.data.GeneralothersComments);

    //skin
    this.patientROSform.get("Rashes").setValue(this.data.Rashes);
    this.patientROSform.get("SkinItching").setValue(this.data.SkinItching);
    this.patientROSform.get("Colorchanges").setValue(this.data.Colorchanges);
    this.patientROSform.get("SkinLumps").setValue(this.data.SkinLumps);
    this.patientROSform.get("Dryness").setValue(this.data.Dryness);
    this.patientROSform
      .get("Hairandnailchanges")
      .setValue(this.data.Hairandnailchanges);
    this.patientROSform.get("SkinOthers").setValue(this.data.SkinOthers);
    this.patientROSform
      .get("SkinothersComments")
      .setValue(this.data.SkinothersComments);

    //Head
    this.patientROSform.get("Headache").setValue(this.data.Headache);
    this.patientROSform.get("Headinjury").setValue(this.data.Headinjury);
    this.patientROSform.get("Others").setValue(this.data.Others);
    this.patientROSform
      .get("HeadothersComments")
      .setValue(this.data.HeadothersComments);

    //Ears
    this.patientROSform
      .get("Decreasedhearing")
      .setValue(this.data.Decreasedhearing);
    this.patientROSform.get("Earache").setValue(this.data.Earache);
    this.patientROSform.get("Ringinginears").setValue(this.data.Ringinginears);
    this.patientROSform.get("Drainage").setValue(this.data.Drainage);
    this.patientROSform.get("EarOthers").setValue(this.data.EarOthers);
    this.patientROSform
      .get("EarothersComments")
      .setValue(this.data.EarothersComments);

    //Eyes
    this.patientROSform.get("Vision").setValue(this.data.Vision);
    this.patientROSform
      .get("Blurryordoublevision")
      .setValue(this.data.Blurryordoublevision);
    this.patientROSform.get("Cataracts").setValue(this.data.Cataracts);
    this.patientROSform
      .get("Glassesorcontacts")
      .setValue(this.data.Glassesorcontacts);
    this.patientROSform
      .get("Flashinglights")
      .setValue(this.data.Flashinglights);
    this.patientROSform.get("Lasteyeexam").setValue(this.data.Lasteyeexam);
    this.patientROSform.get("EyePain").setValue(this.data.EyePain);
    this.patientROSform.get("Specks").setValue(this.data.Specks);
    this.patientROSform.get("Redness").setValue(this.data.Redness);
    this.patientROSform.get("Glaucoma").setValue(this.data.Glaucoma);
    this.patientROSform.get("EyeOthers").setValue(this.data.EyeOthers);
    this.patientROSform
      .get("EyesothersComments")
      .setValue(this.data.EyesothersComments);

    //Nose
    this.patientROSform.get("Stuffiness").setValue(this.data.Stuffiness);
    this.patientROSform.get("NoseItching").setValue(this.data.NoseItching);
    this.patientROSform.get("Nosebleeds").setValue(this.data.Nosebleeds);
    this.patientROSform.get("Discharge").setValue(this.data.Discharge);
    this.patientROSform.get("Hayfever").setValue(this.data.Hayfever);
    this.patientROSform.get("Sinuspain").setValue(this.data.Sinuspain);
    this.patientROSform.get("NoseOthers").setValue(this.data.NoseOthers);
    this.patientROSform
      .get("NoseothersComments")
      .setValue(this.data.NoseothersComments);

    //Throat
    this.patientROSform.get("Teeth").setValue(this.data.Teeth);
    this.patientROSform.get("Soretongue").setValue(this.data.Soretongue);
    this.patientROSform.get("Thrush").setValue(this.data.Thrush);
    this.patientROSform.get("Gums").setValue(this.data.Gums);
    this.patientROSform.get("Drymouth").setValue(this.data.Drymouth);
    this.patientROSform
      .get("Nonhealingsores")
      .setValue(this.data.Nonhealingsores);
    this.patientROSform.get("Bleeding").setValue(this.data.Bleeding);
    this.patientROSform.get("Sorethroat").setValue(this.data.Sorethroat);
    this.patientROSform.get("Sinus").setValue(this.data.Sinus);
    this.patientROSform
      .get("Lastdentalexam")
      .setValue(this.data.Lastdentalexam);
    //    this.patientROSform.get('Lastdentalexamdate').setValue(this.data.Lastdentalexamdate);
    this.patientROSform.get("Dentures").setValue(this.data.Dentures);
    this.patientROSform.get("Hoarseness").setValue(this.data.Hoarseness);
    this.patientROSform.get("ThroatOthers").setValue(this.data.ThroatOthers);
    this.patientROSform
      .get("ThroatothersComments")
      .setValue(this.data.ThroatothersComments);

    //Neck
    this.patientROSform.get("NeckLumps").setValue(this.data.NeckLumps);
    this.patientROSform.get("NeckPain").setValue(this.data.NeckPain);
    this.patientROSform.get("Swollenglands").setValue(this.data.Swollenglands);
    this.patientROSform.get("Stiffness").setValue(this.data.Stiffness);
    this.patientROSform.get("NeckOthers").setValue(this.data.NeckOthers);
    this.patientROSform
      .get("NeckothersComments")
      .setValue(this.data.NeckothersComments);

    //Respiratory
    this.patientROSform.get("Cough").setValue(this.data.Cough);
    this.patientROSform
      .get("Coughingupblood")
      .setValue(this.data.Coughingupblood);
    this.patientROSform.get("Wheezing").setValue(this.data.Wheezing);
    this.patientROSform.get("Sputum").setValue(this.data.Sputum);
    this.patientROSform
      .get("Shortnessofbreath")
      .setValue(this.data.Shortnessofbreath);
    this.patientROSform
      .get("Painfulbreathing")
      .setValue(this.data.Painfulbreathing);
    this.patientROSform
      .get("RespiratoryOthers")
      .setValue(this.data.RespiratoryOthers);
    this.patientROSform
      .get("Respiratoryotherscomments")
      .setValue(this.data.Respiratoryotherscomments);

    //Neurology
    this.patientROSform.get("Dizziness").setValue(this.data.Dizziness);
    this.patientROSform.get("Weakness").setValue(this.data.Weakness);
    this.patientROSform.get("Tremor").setValue(this.data.Tremor);
    this.patientROSform.get("Fainting").setValue(this.data.Fainting);
    this.patientROSform.get("Numbness").setValue(this.data.Numbness);
    this.patientROSform.get("Seizures").setValue(this.data.Seizures);
    this.patientROSform.get("Tingling").setValue(this.data.Tingling);
    this.patientROSform
      .get("NeurologicOthers")
      .setValue(this.data.NeurologicOthers);
    this.patientROSform
      .get("Neurologicotherscomments")
      .setValue(this.data.Neurologicotherscomments);

    //Hematologic
    this.patientROSform
      .get("Easeofbruising")
      .setValue(this.data.Easeofbruising);
    this.patientROSform
      .get("Easeofbleeding")
      .setValue(this.data.Easeofbleeding);
    this.patientROSform
      .get("HematologicOthers")
      .setValue(this.data.HematologicOthers);
    this.patientROSform
      .get("Hematologicotherscomments")
      .setValue(this.data.Hematologicotherscomments);

    //Psychiatric
    this.patientROSform.get("Nervousness").setValue(this.data.Nervousness);
    this.patientROSform.get("Memoryloss").setValue(this.data.Memoryloss);
    this.patientROSform.get("Stress").setValue(this.data.Stress);
    this.patientROSform.get("Depression").setValue(this.data.Depression);
    this.patientROSform
      .get("PsychiatricOthers")
      .setValue(this.data.PsychiatricOthers);
    this.patientROSform
      .get("Psychiatricotherscomments")
      .setValue(this.data.Psychiatricotherscomments);
  }

  dialogClose(): void {
    this.dialogRef.close();
  }
}
