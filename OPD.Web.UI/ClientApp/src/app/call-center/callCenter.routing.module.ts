import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallCenterHomeComponent } from './callCenter-home.component';
import { CallCenterlistComponent } from './callCenter-list.component';
import { CallCenterAppointmentListComponent } from './callCenter-appointmentList/callCenter-appointmentList.component';
import { CallCenterLabListComponent } from './callCenter-labList.component';

 
export const routes: Routes = [
  {
    path: '', component: CallCenterHomeComponent,
    children: [
      { path: 'callCenterAppointment', component: CallCenterAppointmentListComponent },
      { path: 'callCenter', component: CallCenterAppointmentListComponent },
      { path: 'callCenterlist', component: CallCenterlistComponent },
      { path: 'labList', component: CallCenterLabListComponent },
      { path: '', component: CallCenterAppointmentListComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CallCenterRoutingModule {
}
