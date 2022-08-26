import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'menuHeaderSection',
  templateUrl: './menu-header-section.component.html',
  styleUrls: ['./menu-header-section.component.css']
})
export class MenuHeaderSectionComponent implements OnInit, OnDestroy {

  @Output() menuToggled = new EventEmitter<any>();
  subscription!: Subscription;
  rxTime = new Date();

  currentUser: any;
  profilePicdata: boolean =false;
  profilePics: any;

  ngOnInit() {
    this.callTime();
  }

  constructor(private router: Router, private AuthSvc: AuthService,private sanitizer: DomSanitizer) {
    this.getProfile();
  }

  callTime() {
    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date())
      )
      .subscribe(time => {
        // let hour = this.rxTime.getHours();
        // let minuts = this.rxTime.getMinutes();
        // let seconds = this.rxTime.getSeconds();
        //let a = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        // let NewTime = hour + ":" + minuts + ":" + seconds
        // console.log(NewTime);
        console.log("RxJS subscribe");
        this.rxTime = time;
      });
  }
  getProfile() {
    let data: any = localStorage.getItem("currentUser");
    let data2: any = JSON.parse(data);
    this.currentUser = data2.UserName;
    if (localStorage.getItem("currentUser")) {
      let profilePic = data2.UseProfileImg;
      
      this.profilePicdata = true;
      this.profilePics = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + profilePic);
      this.profilePics = [this.profilePics.changingThisBreaksApplicationSecurity];
    }
   
  }

  logout() {
    this.AuthSvc.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {

    if (this.subscription) {
      console.log("unsubscribe");
      this.subscription.unsubscribe();
    }
  }

}
