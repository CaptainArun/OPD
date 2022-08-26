import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AppConfigService } from '../app.config.service';
import { Menu } from '../ux/menuLayout/menu.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  
  menuVal?: Menu | any;
  opened: boolean = true;
  screenWidth: number | any;
  drawercontrol:boolean=true;
  constructor(public AppConfig: AppConfigService) {
    this.SetMenuLayout();
    this.setscreenWidth();

  }
  ngOnInit(): void { }


  SetMenuLayout() {
    this.menuVal = [
      { title: 'Dashboard', icon: '<div class=\"dashboardicon\" />', link: 'dashboard', color: '#212121'},
      { title: 'Appointments', icon: '<div class=\"appointmenticon\" />', link: 'appointment', color: '#212121' },
      { title: 'My Patient', icon: '<div class=\"patienticon\" />', link: 'Test2', color: '#212121' },
      { title: 'Schedule Timings', icon: '<div class=\"ScheduleTimeicon\" />', link: 'Test3', color: '#212121' },
      { title: 'Consulting', icon: '<div class=\"Consultingicon\" />', link: '/dashboard', color: '#212121' },
      { title: 'e-Prescription', icon: '<div class=\"eprescriptionicon\" />', link: '/dashboard', color: '#212121' },
      { title: 'e-Lab', icon: '<div class=\"elabicon\" />', link: '/dashboard', color: '#212121' },
      { title: 'Document Management', icon: '<div class=\"DocManageicon\" />', link: '/dashboard', color: '#212121' },
      { title: 'To do List', icon: '<div class=\"TodoListicon\" />', link: '/dashboard', color: '#212121' },
      { title: 'Reminders', icon: '<div class=\"Remindersicon\" />', link: '/dashboard', color: '#212121' },
      {title: 'Statistics',icon: '<i class="fas fa-tasks"></i>', link: 'appointment',color: '#212121',
        subMenu: [
          {title: 'Sales',icon: '<i class="fas fa-hand-holding-usd"></i>',link: 'appointment',color: '#212121'},
          {title: 'Customers',icon: '<i class="fas fa-user-friends"></i>',link: 'dashboard',color: '#212121',}
            ]
      },
      { title: 'Messages', icon: '<div class=\"Messagesicon\" />', link: '/dashboard', color: '#212121' },
      { title: 'Claims', icon: '<div class=\"Claimsicon\" />', link: '/dashboard', color: '#212121'},
    ];
  }

  setscreenWidth() {
    //set screenWidth on page load
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      //set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };

  }

  toggle(): void {
    this.drawercontrol=this.opened;
    this.opened = !this.opened;
    //Passing a data for the Ux menuitem.component through subject...
    this.AppConfig.sideNavState.next(this.opened);

  }

}

