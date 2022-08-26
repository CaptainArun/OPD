import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfigService } from 'src/app/app.config.service';
import { Menu } from '../menu.model';

@Component({
  selector: 'app-menuitem',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css'],
})
export class MenuItemsComponent implements OnInit {

  @Input() menu?: Menu = [];
  titleDataShow!: Subscription;
  valueShowTitle: boolean = true;

  constructor(public AppConfig: AppConfigService) {
    this.getTitleShowData();
  }
  ngOnInit(): void {
  }

  getTitleShowData() {
    this.titleDataShow = this.AppConfig.sideNavState.subscribe(res => {
       this.valueShowTitle = res ? true : false;        
    });
}

ngOnDestroy() {
  this.titleDataShow.unsubscribe();
}
}
