import { Component, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { AppConfigService } from '../app.config.service';

@Component({
  selector: 'app-navigation',
  templateUrl: 'app.navigation.component.html'
})

export class AppNavigationComponent implements OnInit,OnDestroy {


  @Output() menuClick = new EventEmitter<any>();

  menuVals:any = [];
  menuValbasedrole:any = [];
  menuValStatic:any = [
    { "Id": 0,"DBmodulename":"Dashboard", "Title": "Dashboard", "Url": "dashboard/employee", "isOpen": null, "Items": [], "Icon": "<div class=\"dashboardicon\" />" },
    { "Id": 1,"DBmodulename":"Appointments", "Title": "Appointments", "Url": "appointments", "isOpen": null, "Items": [], "Icon": "<div class=\"appointmenticon\" />" },
    { "Id": 2,"DBmodulename":"Patient", "Title": "Patient", "Url": "newPatient", "isOpen": null, "Items": [], "Icon": "<div class=\"patienticon\" />" },
    { "Id": 3,"DBmodulename":"Patient Visit", "Title": "Visit", "Url": "visits", "isOpen": null, "Items": [], "Icon": "<div class=\"visiticon\" />" },
    { "Id": 4,"DBmodulename":"Triage", "Title": "Triage", "Url": "triage", "isOpen": null, "Items": [], "Icon": "<div class=\"triageicon\" />" },
    { "Id": 5,"DBmodulename":"_", "Title": "e-Prescription", "Url": "e-prescription", "isOpen": null, "Items": [], "Icon": "<div class=\"eprescriptionicon\" />" },
    { "Id": 6,"DBmodulename":"_", "Title": "e-Lab", "Url": "e-lab", "isOpen": null, "Items": [], "Icon": "<div class=\"elabicon\" />" },
    { "Id": 7,"DBmodulename":"_", "Title": "Billing & Payments", "Url": "billing", "isOpen": null, "Items": [], "Icon": "<div class=\"BillingPaymentsicon\" />" },
    { "Id": 8,"DBmodulename":"Provider", "Title": "Physician", "Url": "physician", "isOpen": null, "Items": [], "Icon": "<div class=\"physicianicon\" />" },
    { "Id": 9,"DBmodulename":"_", "Title": "Staff", "Url": "staff", "isOpen": null, "Items": [], "Icon": "<div class=\"Stafficon\" />" },
    { "Id": 10,"DBmodulename":"Call Center", "Title": "Call Center", "Url": "callCenter", "isOpen": null, "Items": [], "Icon": "<div class=\"callcentericon\" />" },
    { "Id": 11,"DBmodulename":"_", "Title": "Master", "Url": "configuration/mastersdata", "isOpen": null, "Items": [], "Icon": "<div class=\"settingicon\" />" },
  ];

  constructor(private AppConfigSvc: AppConfigService) {
    this.menuValbasedrole = JSON.parse(localStorage.getItem('RoleBasedModules'));
  }

  ngOnInit() {
    if (this.menuValbasedrole != null) {
      this.rolebasedsetup();
     this.AppConfigSvc.roleBasedsub.subscribe((res: any) => {
      if(res==null){
      this.AppConfigSvc.roleBasedsub.next(this.menuValbasedrole);
      }
      });
    }
    else {      
      this.AppConfigSvc.roleBasedsub.subscribe((res: any) => {
        if (res!=null){
          this.menuValbasedrole = res;
          this.rolebasedsetup();
        }
      });
    }
  }
  
  rolebasedsetup() {
    this.menuValbasedrole.forEach((x: any) => {
      let ModuleTitle = x.ModuleName;
      if (ModuleTitle) {
        this.menuValStatic.find((x: any, i: any) => {
          if (x.DBmodulename === ModuleTitle) {
            this.menuVals.push(this.menuValStatic[i]);
            ModuleTitle = "";
          }
        })
      }
    })
  }

  navigation(event: any) {
    this.menuClick.emit(event);
  }

  
ngOnDestroy() {
  this.AppConfigSvc.roleBasedsub.next(null);
}

}
