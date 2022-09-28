import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'callCenter-home',
  templateUrl: 'callCenter-home.component.html',
  styleUrls: ['callCenter-home.component.css']
})

export class CallCenterHomeComponent implements OnInit {
  constructor(private router: Router) {

  }
  ngOnInit() {
    this.buttonHighLight();
  }

  buttonHighLight() {
    const path = (this.router as any).location.path();
    if (path.includes("callCenter")) {
      document.getElementById("Appointment").style.background = "linear-gradient(to right, #58bdbd 0%, #a49ee1 100%)";
      document.getElementById("Appointment").style.color = "#fff";
    }
 
  }

  openAppoinment() {
    document.getElementById("Appointment").style.background = "linear-gradient(to right, #58bdbd 0%, #a49ee1 100%)";
    document.getElementById("Appointment").style.color = "#fff";
  }


}


