import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfigService } from 'src/app/app.config.service';
import { AuthService } from 'src/app/core/auth.service';
import { CustomHttpService } from 'src/app/core/custom-http.service';

@Component({
  selector: 'menuHeaderSection',
  templateUrl: './menu-header-section.component.html',
  styleUrls: ['./menu-header-section.component.css']
})
export class MenuHeaderSectionComponent implements OnChanges, OnInit, OnDestroy {
  
  @Input() imgPath: string;
  @Input() title:any;
  @Input() tenantName: any;
  @Input() profilePics: any;
  @Input() userName: any;
  @Input() profilePicShowHide: any;

  @Output() menuToggled = new EventEmitter<any>();
  subscription!: Subscription;
  rxTime = new Date();
  facilityName: any;

  ngOnChanges(){}

  ngOnInit() {
    this.callTime();
  }

  constructor(public AppConfig: AppConfigService, private router: Router, private AuthSvc: AuthService,private sanitizer: DomSanitizer, private customHttp: CustomHttpService,) {
    this.getProfile();
  }

  callTime() {
    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date())
      )
      .subscribe(time => {
        this.rxTime = time;
      });
  }
  getProfile() {
    this.userName = localStorage.getItem('LoggedinUser');
    this.facilityName = localStorage.getItem('DBdetails');
    let tenantName :any = JSON.parse(this.facilityName);    
    this.tenantName = tenantName.TenantName;
  }

  logout() {
    this.AppConfig.roleBasedsub.next(null);
    this.customHttp.getDbName('Global_Master');
    this.router.navigate(['/login/']);
    localStorage.clear();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
