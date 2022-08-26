import { Component, Input, OnInit, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfigService } from 'src/app/app.config.service';
import { IMenu } from './bmsmenu.component';

@Component({
    selector: 'bms-menuitem',
    templateUrl: 'bmsmenu-item.component.html'
})
export class BMSMenuItem implements OnInit, OnChanges,OnDestroy {
    @Input()
    item: IMenu | any;

    @Output()
    selectItem = new EventEmitter<any>();

    valueShowTitle: boolean = true;
    titleDataShow: Subscription | any;
    constructor(public AppConfig: AppConfigService) {
        this.getTitleShowData();
    }
    ngOnInit() {

    }
    ngOnChanges() {

    }
    childClick(event: any) {
        this.selectItem.emit(event);
    }
    selected(item: any) {
        item.isOpen = item.isOpen ? false : true;
        this.selectItem.emit(item);
    }

    getTitleShowData() {
        this.titleDataShow = this.AppConfig.sideNavState.subscribe(res => {
            this.valueShowTitle = res ? false : true;
        });
    }

    ngOnDestroy() {
        this.titleDataShow.unsubscribe();
    }

}
