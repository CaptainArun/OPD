import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleControls } from '../material.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


import { AppointmentsComponent } from './appointments.component';
import { AppointmentsRoutingModule } from './appointments.routing.module';
import { AppointmentsCallcenterComponent } from './appointments-callcenter/appointments-callcenter.component';
import { AppointmentsListComponent } from './appointments-list/appointments-list.component';
import { AppointmentsPopupHistoryComponent } from './appointments-popupHistory/appointments-popupHistory.component';
import { AppointmentViewRecordComponent } from './appointment-viewRecord/appointment-viewRecord.component';
import { AppointmentEditRecordComponent } from './appointment-edit-record/appointment-editRecord.component';
import { AppointmentsService } from './appointments.service';
import { NewPatientModule } from '../patient/newPatient.module';
//import { PatientDemographicComponent } from '../new-patient/patient-demographic/patient-demographic.component';
import { DxSchedulerModule, DxContextMenuModule } from 'devextreme-angular';
import { AppointmentCalendarComponent } from './appointments-calendar/appointments-appointmentcalendar.component';
import { AppointmentsHeaderComponent } from './appointments-header/appointments-header.component';
import { AppointmentsHomeComponent } from './appointments-home/appointments-home.component';
import { BMSTableModule } from '../ux/bmstable/bms-table.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleControls,
    AppointmentsRoutingModule,
    NgxMaterialTimepickerModule,
    BMSTableModule,
    NewPatientModule,
    DxSchedulerModule,
    DxContextMenuModule,
  
  ],
  declarations: [
    AppointmentsHomeComponent,
    AppointmentCalendarComponent,
    AppointmentsCallcenterComponent,
    AppointmentsComponent,
    AppointmentsListComponent,
    AppointmentsPopupHistoryComponent,
    AppointmentViewRecordComponent,
    AppointmentEditRecordComponent,
    AppointmentsHeaderComponent,
    //AppointmentcommonComponent,
    //PatientDemographicComponent
  ],
  entryComponents: [
    AppointmentsPopupHistoryComponent,
    AppointmentViewRecordComponent,
    AppointmentEditRecordComponent,
  ],
  providers: [AppointmentsService, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})

export class AppointmentsModule {
  constructor() {
    sessionStorage.clear();
  }
}
