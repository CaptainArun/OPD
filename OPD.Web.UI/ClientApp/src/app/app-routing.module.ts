import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleBasedGuard } from './core/gaurds/role-based.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), pathMatch: 'full',
  },  
  {
    path: 'home', component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        canActivate:[RoleBasedGuard],
        data:[{ "DBmodulename": "Dashboard"}],
        loadChildren:  () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'appointments',
        canActivate:[RoleBasedGuard],
        data:[{ "DBmodulename": "Appointments"}],
        loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsModule)
      },   
      {
        path: 'newPatient',
        canActivate:[RoleBasedGuard],
        data:[{ "DBmodulename": "Patient"}],
        loadChildren: () => import('./patient/newPatient.module').then(m => m.NewPatientModule)
      }, 
      {
        path: 'visits',
        canActivate:[RoleBasedGuard],
        data:[{ "DBmodulename": "Patient Visit"}],
        loadChildren: () => import('./visit/visit.module').then(m => m.VisitModule)
      },
      
      {
        path: 'callCenter',
        canActivate:[RoleBasedGuard],
        data:[{ "DBmodulename": "Call Center"}],
        loadChildren:  () => import('./call-center/callCenter.module').then(m => m.CallCenterModule)
      }, 
      {
        path: 'physician',
        canActivate:[RoleBasedGuard],
        data:[{ "DBmodulename": "Provider"}],
        loadChildren:  () => import('./physician/physician.module').then(m => m.PhysicianModule)
      },
      {
        path: 'triage',
        canActivate:[RoleBasedGuard],
        data:[{ "DBmodulename": "Triage"}],
        loadChildren:  () => import('./triage/triage.module').then(m => m.TriageModule),
      },
      {
        path: 'staff',loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule)
      },
      {
        path: 'configuration',loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule)
      },
      {
        path: 'billing',loadChildren: () => import('./billing/billing.module').then(m => m.billingModule),
      },
      {
        path: 'e-prescription',loadChildren: () => import('./e-prescription/ePrescription.module').then(m => m.EPrescriptionModule)
      },
      {
        path: 'e-lab',loadChildren: () => import('./e-lab/eLab.module').then(m => m.eLabModule),
      },
     
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {
  
 }
