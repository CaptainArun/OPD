import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { PatientROSModel } from "../../../triage/models/patientROSModel";
import { CustomHttpService } from "../../../core/custom-http.service";
import { NewPatientService } from "../../newPatient.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TriageService } from "../../../triage/triage.service";
import { UtilService } from "../../../core/util.service";
import {
  BMSMessageBoxColorMode,
  BMSMessageBoxMode,
} from "../../../ux/bmsmsgbox/bmsmsgbox.component";

@Component({
  selector: "app-patient-ros-edit",
  templateUrl: "./patient-ros-edit.component.html",
  styleUrls: ["./patient-ros-edit.component.css"],
})
export class PatientROSEditComponent implements OnInit {
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
  StaticDisabled: boolean = true;

  constructor(
    public customHttpSvc: CustomHttpService,
    public fb: FormBuilder,
    public newpatsvc: NewPatientService,
    public dialogRef: MatDialogRef<PatientROSEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public triageSvc: TriageService,
    private util: UtilService
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
    this.patientROSform.get('recordedDuring').disable();
    if (this.data) {
      if (this.data.GeneralothersComments) {
        this.show3 = true;
      }
      if (this.data.SkinothersComments) {
        this.show4 = true;
      }
      if (this.data.HeadothersComments) {
        this.show5 = true;
      }
      if (this.data.EarothersComments) {
        this.show6 = true;
      }
      if (this.data.EyesothersComments) {
        this.show7 = true;
      }
      if (this.data.NoseothersComments) {
        this.show8 = true;
      }
      if (this.data.ThroatothersComments) {
        this.show9 = true;
      }
      if (this.data.NeckothersComments) {
        this.show10 = true;
      }
      if (this.data.Respiratoryotherscomments) {
        this.show11 = true;
      }
      if (this.data.Neurologicotherscomments) {
        this.show12 = true;
      }
      if (this.data.Hematologicotherscomments) {
        this.show13 = true;
      }
      if (this.data.Psychiatricotherscomments) {
        this.show14 = true;
      }
    }
  }

  public show1: boolean = false;
  public show2: boolean = false;
  public show3: boolean = false;
  public show4: boolean = false;
  public show5: boolean = false;
  public show6: boolean = false;
  public show7: boolean = false;
  public show8: boolean = false;
  public show9: boolean = false;
  public show10: boolean = false;
  public show11: boolean = false;
  public show12: boolean = false;
  public show13: boolean = false;
  public show14: boolean = false;
  show = false;
  showDetails() {
    this.show = !this.show;
  }

  ros101() {
    if (this.patientROSform.get("GeneralOthers").value == false) {
      this.show3 = true;
    } else {
      this.show3 = false;
    }
  }
  ros2() {
    if (this.patientROSform.get("SkinOthers").value == false) {
      this.show4 = true;
    } else {
      this.show4 = false;
    }
  }
  ros3() {
    if (this.patientROSform.get("Others").value == false) {
      this.show5 = true;
    } else {
      this.show5 = false;
    }
  }
  ros4() {
    if (this.patientROSform.get("EarOthers").value == false) {
      this.show6 = true;
    } else {
      this.show6 = false;
    }
  }
  ros5() {
    if (this.patientROSform.get("EyeOthers").value == false) {
      this.show7 = true;
    } else {
      this.show7 = false;
    }
  }
  ros6() {
    if (this.patientROSform.get("NoseOthers").value == false) {
      this.show8 = true;
    } else {
      this.show8 = false;
    }
  }
  ros7() {
    if (this.patientROSform.get("ThroatOthers").value == false) {
      this.show9 = true;
    } else {
      this.show9 = false;
    }
  }
  ros8() {
    if (this.patientROSform.get("NeckOthers").value == false) {
      this.show10 = true;
    } else {
      this.show10 = false;
    }
  }
  ros9() {
    if (this.patientROSform.get("RespiratoryOthers").value == false) {
      this.show11 = true;
    } else {
      this.show11 = false;
    }
  }
  ros10() {
    if (this.patientROSform.get("NeurologicOthers").value == false) {
      this.show12 = true;
    } else {
      this.show12 = false;
    }
  }
  ros11() {
    if (this.patientROSform.get("HematologicOthers").value == false) {
      this.show13 = true;
    } else {
      this.show13 = false;
    }
  }
  ros12() {
    if (this.patientROSform.get("PsychiatricOthers").value == false) {
      this.show14 = true;
    } else {
      this.show14 = false;
    }
  }

  getVisitForPatient() {
    this.newpatsvc.GetVisitsForPatient(this.newpatsvc.patientId).then((res) => {
      for (var i = 0; i < res.length; i++) {
        this.visitDandt[i] = res[i].VisitDateandTime;
        this.visitID = res[i].VisitId;
      }
    });
  }

  RecordedDuring(index: any) {
    this.newpatsvc
      .GetVisitsForPatient(this.newpatsvc.patientId)
      .then((data) => {
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
      .get("RecordedDate")
      .setValue(new Date(this.data.RecordedDate));
    this.patientROSform
      .get("RecordedTime")
      .setValue(new Date(this.data.RecordedDate).toLocaleString([], { hour12: true, hour: '2-digit', minute: '2-digit'}));
    this.patientROSform.get("RecordedBy").setValue(this.data.RecordedBy);
    this.patientROSform.get("VisitDate").setValue(this.data.visitDateandTime);
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

  sendDateWithTime() {
    this.getDate = new Date(this.patientROSform.get("RecordedDate").value);
    if (this.patientROSform.get("RecordedDate").value != "") {
      if (
        this.patientROSform
          .get("RecordedTime")
          .value.toString()
          .toLowerCase()
          .split(" ")[1] == "pm"
      ) {
        if (
          parseInt(
            this.patientROSform
              .get("RecordedTime")
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
              this.patientROSform
                .get("RecordedTime")
                .value.toString()
                .split(" ")[0]
                .toString()
                .split(":")[0]
            ) + 12;
        }
      } else if (
        this.patientROSform
          .get("RecordedTime")
          .value.toString()
          .toLowerCase()
          .split(" ")[1] == "am"
      ) {
        if (
          parseInt(
            this.patientROSform
              .get("RecordedTime")
              .value.toString()
              .split(" ")[0]
              .toString()
              .split(":")[0]
          ) == 12
        ) {
          this.getTimeHH = 0;
        } else {
          this.getTimeHH = parseInt(
            this.patientROSform
              .get("RecordedTime")
              .value.toString()
              .split(" ")[0]
              .toString()
              .split(":")[0]
          );
        }
      }
      this.getTimeMin = parseInt(
        this.patientROSform
          .get("RecordedTime")
          .value.toString()
          .split(" ")[0]
          .toString()
          .split(":")[1]
      );
      this.getDate.setHours(this.getTimeHH, this.getTimeMin, 0, 0);
    }
    this.getDateAndTime = this.getDate;
  }

  addUpdateROS() {
    if (this.patientROSform.valid) {
      this.sendDateWithTime();
      this.patientROSmodel.VisitID = this.data.VisitID;
      this.patientROSmodel.PatientID = this.data.patientId;
      this.patientROSmodel.ROSID = this.data.ROSID;
      this.patientROSmodel.RecordedDate = this.getDateAndTime;
      this.patientROSmodel.RecordedBy =
        this.patientROSform.get("RecordedBy").value;
      //general
      this.patientROSmodel.Weightlossorgain =
        this.patientROSform.get("Weightlossorgain").value;
      this.patientROSmodel.Feverorchills =
        this.patientROSform.get("Feverorchills").value;
      this.patientROSmodel.Troublesleeping =
        this.patientROSform.get("Troublesleeping").value;
      this.patientROSmodel.Fatigue = this.patientROSform.get("Fatigue").value;
      this.patientROSmodel.GeneralWeakness =
        this.patientROSform.get("GeneralWeakness").value;
      this.patientROSmodel.GeneralOthers =
        this.patientROSform.get("GeneralOthers").value;
      if (this.show3) {
        this.patientROSmodel.GeneralothersComments = this.patientROSform.get(
          "GeneralothersComments"
        ).value;
      } else {
        this.patientROSmodel.GeneralothersComments = "";
      }

      //skin
      this.patientROSmodel.Rashes = this.patientROSform.get("Rashes").value;
      this.patientROSmodel.SkinItching =
        this.patientROSform.get("SkinItching").value;
      this.patientROSmodel.Colorchanges =
        this.patientROSform.get("Colorchanges").value;
      this.patientROSmodel.SkinLumps =
        this.patientROSform.get("SkinLumps").value;
      this.patientROSmodel.Dryness = this.patientROSform.get("Dryness").value;
      this.patientROSmodel.Hairandnailchanges =
        this.patientROSform.get("Hairandnailchanges").value;
      this.patientROSmodel.SkinOthers =
        this.patientROSform.get("SkinOthers").value;
      if (this.show4) {
        this.patientROSmodel.SkinothersComments = this.patientROSform.get(
          "SkinothersComments"
        ).value;
      } else {
        this.patientROSmodel.SkinothersComments = "";
      }

      //Head
      this.patientROSmodel.Headache = this.patientROSform.get("Headache").value;
      this.patientROSmodel.Headinjury =
        this.patientROSform.get("Headinjury").value;
      this.patientROSmodel.Others = this.patientROSform.get("Others").value;
      if (this.show5) {
        this.patientROSmodel.HeadothersComments = this.patientROSform.get(
          "HeadothersComments"
        ).value;
      } else {
        this.patientROSmodel.HeadothersComments = "";
      }

      //Ears
      this.patientROSmodel.Decreasedhearing =
        this.patientROSform.get("Decreasedhearing").value;
      this.patientROSmodel.Earache = this.patientROSform.get("Earache").value;
      this.patientROSmodel.Ringinginears =
        this.patientROSform.get("Ringinginears").value;
      this.patientROSmodel.Drainage = this.patientROSform.get("Drainage").value;
      this.patientROSmodel.EarOthers =
        this.patientROSform.get("EarOthers").value;
      if (this.show6) {
        this.patientROSmodel.EarothersComments = this.patientROSform.get(
          "EarothersComments"
        ).value;
      } else {
        this.patientROSmodel.EarothersComments = "";
      }
      //Eyes
      this.patientROSmodel.Vision = this.patientROSform.get("Vision").value;
      this.patientROSmodel.Blurryordoublevision = this.patientROSform.get(
        "Blurryordoublevision"
      ).value;
      this.patientROSmodel.Cataracts =
        this.patientROSform.get("Cataracts").value;
      this.patientROSmodel.Glassesorcontacts =
        this.patientROSform.get("Glassesorcontacts").value;
      this.patientROSmodel.Flashinglights =
        this.patientROSform.get("Flashinglights").value;
      this.patientROSmodel.Lasteyeexam =
        this.patientROSform.get("Lasteyeexam").value;
      this.patientROSmodel.EyePain = this.patientROSform.get("EyePain").value;
      this.patientROSmodel.Specks = this.patientROSform.get("Specks").value;
      this.patientROSmodel.Redness = this.patientROSform.get("Redness").value;
      this.patientROSmodel.Glaucoma = this.patientROSform.get("Glaucoma").value;
      this.patientROSmodel.EyeOthers =
        this.patientROSform.get("EyeOthers").value;
      if (this.show7) {
        this.patientROSmodel.EyesothersComments = this.patientROSform.get(
          "EyesothersComments"
        ).value;
      } else {
        this.patientROSmodel.EyesothersComments = "";
      }

      //Nose
      this.patientROSmodel.Stuffiness =
        this.patientROSform.get("Stuffiness").value;
      this.patientROSmodel.NoseItching =
        this.patientROSform.get("NoseItching").value;
      this.patientROSmodel.Nosebleeds =
        this.patientROSform.get("Nosebleeds").value;
      this.patientROSmodel.Discharge =
        this.patientROSform.get("Discharge").value;
      this.patientROSmodel.Hayfever = this.patientROSform.get("Hayfever").value;
      this.patientROSmodel.Sinuspain =
        this.patientROSform.get("Sinuspain").value;
      this.patientROSmodel.NoseOthers =
        this.patientROSform.get("NoseOthers").value;
      if (this.show8) {
        this.patientROSmodel.NoseothersComments = this.patientROSform.get(
          "NoseothersComments"
        ).value;
      } else {
        this.patientROSmodel.NoseothersComments = "";
      }

      //Throat
      this.patientROSmodel.Teeth = this.patientROSform.get("Teeth").value;
      this.patientROSmodel.Soretongue =
        this.patientROSform.get("Soretongue").value;
      this.patientROSmodel.Thrush = this.patientROSform.get("Thrush").value;
      this.patientROSmodel.Gums = this.patientROSform.get("Gums").value;
      this.patientROSmodel.Drymouth = this.patientROSform.get("Drymouth").value;
      this.patientROSmodel.Nonhealingsores =
        this.patientROSform.get("Nonhealingsores").value;
      this.patientROSmodel.Bleeding = this.patientROSform.get("Bleeding").value;
      this.patientROSmodel.Sorethroat =
        this.patientROSform.get("Sorethroat").value;
      this.patientROSmodel.Sinus = this.patientROSform.get("Sinus").value;
      this.patientROSmodel.Lastdentalexam =
        this.patientROSform.get("Lastdentalexam").value;
      //    this.patientROSmodel.Lastdentalexamdate = this.patientROSform.get('Lastdentalexamdate').value;
      this.patientROSmodel.Dentures = this.patientROSform.get("Dentures").value;
      this.patientROSmodel.Hoarseness =
        this.patientROSform.get("Hoarseness").value;
      this.patientROSmodel.ThroatOthers =
        this.patientROSform.get("ThroatOthers").value;
      if (this.show9) {
        this.patientROSmodel.ThroatothersComments = this.patientROSform.get(
          "ThroatothersComments"
        ).value;
      } else {
        this.patientROSmodel.ThroatothersComments = "";
      }

      //Neck
      this.patientROSmodel.NeckLumps =
        this.patientROSform.get("NeckLumps").value;
      this.patientROSmodel.NeckPain = this.patientROSform.get("NeckPain").value;
      this.patientROSmodel.Swollenglands =
        this.patientROSform.get("Swollenglands").value;
      this.patientROSmodel.Stiffness =
        this.patientROSform.get("Stiffness").value;
      this.patientROSmodel.NeckOthers =
        this.patientROSform.get("NeckOthers").value;
      if (this.show10) {
        this.patientROSmodel.NeckothersComments = this.patientROSform.get(
          "NeckothersComments"
        ).value;
      } else {
        this.patientROSmodel.NeckothersComments = "";
      }
      //Respiratory
      this.patientROSmodel.Cough = this.patientROSform.get("Cough").value;
      this.patientROSmodel.Coughingupblood =
        this.patientROSform.get("Coughingupblood").value;
      this.patientROSmodel.Wheezing = this.patientROSform.get("Wheezing").value;
      this.patientROSmodel.Sputum = this.patientROSform.get("Sputum").value;
      this.patientROSmodel.Shortnessofbreath =
        this.patientROSform.get("Shortnessofbreath").value;
      this.patientROSmodel.Painfulbreathing =
        this.patientROSform.get("Painfulbreathing").value;
      this.patientROSmodel.RespiratoryOthers =
        this.patientROSform.get("RespiratoryOthers").value;
      if (this.show11) {
        this.patientROSmodel.Respiratoryotherscomments = this.patientROSform.get(
          "Respiratoryotherscomments"
        ).value;
      } else {
        this.patientROSmodel.Respiratoryotherscomments = "";
      }

      //Neurology
      this.patientROSmodel.Dizziness =
        this.patientROSform.get("Dizziness").value;
      this.patientROSmodel.Weakness = this.patientROSform.get("Weakness").value;
      this.patientROSmodel.Tremor = this.patientROSform.get("Tremor").value;
      this.patientROSmodel.Fainting = this.patientROSform.get("Fainting").value;
      this.patientROSmodel.Numbness = this.patientROSform.get("Numbness").value;
      this.patientROSmodel.Seizures = this.patientROSform.get("Seizures").value;
      this.patientROSmodel.Tingling = this.patientROSform.get("Tingling").value;
      this.patientROSmodel.NeurologicOthers =
        this.patientROSform.get("NeurologicOthers").value;
      if (this.show12) {
        this.patientROSmodel.Neurologicotherscomments = this.patientROSform.get(
          "Neurologicotherscomments"
        ).value;
      } else {
        this.patientROSmodel.Neurologicotherscomments = "";
      }

      //Hematologic
      this.patientROSmodel.Easeofbruising =
        this.patientROSform.get("Easeofbruising").value;
      this.patientROSmodel.Easeofbleeding =
        this.patientROSform.get("Easeofbleeding").value;
      this.patientROSmodel.HematologicOthers =
        this.patientROSform.get("HematologicOthers").value;
      if (this.show13) {
        this.patientROSmodel.Hematologicotherscomments = this.patientROSform.get(
          "Hematologicotherscomments"
        ).value;
      } else {
        this.patientROSmodel.Hematologicotherscomments = "";
      }
      //psychiatric
      this.patientROSmodel.Nervousness =
        this.patientROSform.get("Nervousness").value;
      this.patientROSmodel.Memoryloss =
        this.patientROSform.get("Memoryloss").value;
      this.patientROSmodel.Stress = this.patientROSform.get("Stress").value;
      this.patientROSmodel.Depression =
        this.patientROSform.get("Depression").value;
      this.patientROSmodel.PsychiatricOthers =
        this.patientROSform.get("PsychiatricOthers").value;
      if (this.show14) {
        this.patientROSmodel.Psychiatricotherscomments = this.patientROSform.get(
          "Psychiatricotherscomments"
        ).value;
      } else {
        this.patientROSmodel.Psychiatricotherscomments = "";
      }
      this.triageSvc.addUpdateROSForVisit(this.patientROSmodel).then((res) => {
        this.util
          .showMessage(
            "",
            "ROS details saved successfully",
            BMSMessageBoxColorMode.Information,
            BMSMessageBoxMode.MessageBox
          )
          .then((res) => { });
        this.dialogRef.close("update");
      });
    }
  }
  cancelForm() {
    this.patientROSform.reset();
    this.setPatientROS();
    if (this.data) {
      if (this.data.GeneralothersComments) {
        this.show3 = true;
      } else {
        this.show3 = false;
      }
      if (this.data.SkinothersComments) {
        this.show4 = true;
      } else {
        this.show4 = false;
      }
      if (this.data.HeadothersComments) {
        this.show5 = true;
      } else {
        this.show5 = false;
      }
      if (this.data.EarothersComments) {
        this.show6 = true;
      } else {
        this.show6 = false;
      }
      if (this.data.EyesothersComments) {
        this.show7 = true;
      } else {
        this.show7 = false;
      }
      if (this.data.NoseothersComments) {
        this.show8 = true;
      } else {
        this.show8 = false;
      }
      if (this.data.ThroatothersComments) {
        this.show9 = true;
      } else {
        this.show9 = false;
      }
      if (this.data.NeckothersComments) {
        this.show10 = true;
      } else {
        this.show10 = false;
      }
      if (this.data.Respiratoryotherscomments) {
        this.show11 = true;
      } else {
        this.show11 = false;
      }
      if (this.data.Neurologicotherscomments) {
        this.show12 = true;
      } else {
        this.show12 = false;
      }
      if (this.data.Hematologicotherscomments) {
        this.show13 = true;
      } else {
        this.show13 = false;
      }
      if (this.data.Psychiatricotherscomments) {
        this.show14 = true;
      } else {
        this.show14 = false;
      }
    }
  }
  dialogClose(): void {
    this.dialogRef.close();
  }
}
