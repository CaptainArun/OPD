import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import {  RouterModule } from '@angular/router';
import { BMSMessageBox } from './bmsmsgbox/bmsmsgbox.component';
import { BMSMenu } from './bmsmenu/bmsmenu.component';
import { BMSMenuItem } from './bmsmenu/bmsmenu-item.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderModule } from 'ngx-order-pipe';
import { MaterialModule } from '../material.module';

//import { BMSTableModule} from './bmstable/bms-table.module';


@NgModule({
    imports: [
        CommonModule,
        OrderModule,
        NgbDropdownModule,
        MaterialModule,
        RouterModule
    ],
    declarations: [ BMSMenuItem, BMSMenu, BMSMessageBox],
    providers: [],
    exports: [CommonModule,BMSMenuItem, BMSMenu],
    entryComponents: [BMSMessageBox]
})
export class BMSUxModule {

}

