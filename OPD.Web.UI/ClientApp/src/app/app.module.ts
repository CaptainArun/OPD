import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BMSTableModule } from './ux/bmstable/bms-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HttpErrorInterceptor } from './core/httpErrorInterceptor';
import { CommonScreenModule } from './common/commonScreen.module';
import { LoadingScreenInterceptor } from './common/loading-screen/loadingscreen-interceptor.service';
import { LoadingScreenService } from './common/loading-screen/loading-screen.service';
import { AuthService } from './core/auth.service';
import { CustomHttpService } from './core/custom-http.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    BMSTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonScreenModule,
    NgApexchartsModule
  ],
  providers: [
     LoadingScreenService,
     AuthService,
     CustomHttpService,
    { provide:HTTP_INTERCEPTORS,useClass:HttpErrorInterceptor,multi:true},
    { provide:HTTP_INTERCEPTORS,useClass: LoadingScreenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
