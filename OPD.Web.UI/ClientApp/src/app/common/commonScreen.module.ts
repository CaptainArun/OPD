import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material.module";
import { LoadingScreenComponent } from "./loading-screen/loading-screen.component";

@NgModule({
    imports: [
        MaterialModule,
        CommonModule
            ],
    declarations: [
        LoadingScreenComponent
          ],
    providers: [],
    exports: [
        LoadingScreenComponent
    ]
})
export class CommonScreenModule { }