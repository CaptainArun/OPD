import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';
import { FormsModule} from '@angular/forms';
import { MaterialModuleControls } from '../../material.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BMSTableComponent } from './bms-table.component';
import { BMSTableRowComponent } from './bms-tablerow.component';
import { BMSTableCellComponent } from './bms-tablecell.component';
import { cardContainerComponent } from './flexDesign/Card_Container/cardContainer.component';
import { CardContentComponent } from './flexDesign/Card_Content/card.component';
import { CardfilterDatacolorPipe, CardfilterHoverPipe, CardFilterPipe, CardImgFilterPipe } from './flexDesign/Card_Content/filter.pipe';
import { FlexCardHoverDirective } from './flexDesign/Card_Content/FlexCardHover.directive';
import { RouterModule } from '@angular/router';
import { MenuHeaderSectionComponent } from '../menuLayout/menu-header-section/menu-header-section.component';
import { MenuItemsComponent } from '../menuLayout/menuitems-SideNav-section/menu-items.component';


@NgModule({
    imports: [
        CommonModule,
        OrderModule,
        NgbDropdownModule,
        FormsModule,
        MaterialModuleControls,
        RouterModule//need to set router module
    ],
    declarations: [ 
         BMSTableComponent,
         BMSTableRowComponent, 
         BMSTableCellComponent,
         cardContainerComponent,
         CardContentComponent,
         CardFilterPipe,
         CardImgFilterPipe,
         CardfilterHoverPipe,
         FlexCardHoverDirective,
         CardfilterDatacolorPipe,
         MenuHeaderSectionComponent,
         MenuItemsComponent
        ],
    providers: [],
    exports: [
        CommonModule,
        BMSTableComponent,
        BMSTableRowComponent,
        BMSTableCellComponent,
        cardContainerComponent,
        MenuHeaderSectionComponent,
        MenuItemsComponent
    ]
})
export class BMSTableModule {

}

