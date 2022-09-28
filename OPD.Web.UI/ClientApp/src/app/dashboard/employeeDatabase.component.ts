import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { TableConfig } from '../ux/columnConfig';
import { CustomHttpService } from '../core/custom-http.service';
import { Router } from '@angular/router';
import { AppConfigService } from '../app.config.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employeeDatabase',
  templateUrl: './employeeDatabase.component.html',
  styleUrls:['./employeeDatabase.component.css']
})
export class EmployeeDatabaseComponent implements OnInit {

  databaseCollection: any;
  selectedDataBase: any;
  tableConfig: TableConfig = new TableConfig();  

  constructor(private AppConfigSvc: AppConfigService,public dialogRef: MatDialogRef<EmployeeDatabaseComponent>,private authSvc: AuthService, private customHttpSvc: CustomHttpService, private router: Router ) {   
  }

  ngOnInit() {
    this.getUserModel();  
  }

  getUserModel() {
    this.authSvc.getUserModels().then(data => {
      this.databaseCollection = data;
    });
  }

  onSelectDatabase(dbDetails: any) {    
    localStorage.setItem('DBdetails', JSON.stringify(dbDetails));
    localStorage.setItem('DatabaseName', dbDetails.Tenantdbname);
    let getFacility: any = JSON.parse(localStorage.getItem('DBdetails'));
    this.customHttpSvc.getDbName(localStorage.getItem('DatabaseName'));
    this.dialogRef.close();
    this.rolebasedsetup();
    this.router.navigate(['/home/dashboard/employee']);
  }

    //Added for the role based setup...
    rolebasedsetup(){
      this.authSvc.roleModulesForCurrentUser().then(res => {
        if(res){
          let data=JSON.stringify(res);
          this.AppConfigSvc.roleBasedsub.next(res);
          localStorage.setItem('RoleBasedModules', data);
        }
      });
    }
  
  close() {
    this.dialogRef.close();
  }
}
