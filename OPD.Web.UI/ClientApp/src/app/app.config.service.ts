import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AppConfigModel } from './core/AppConfigModel';
import 'rxjs/add/operator/map';
/**
  Service used to read app configuration settings from Environment files
*/

@Injectable({
  providedIn: 'root',
})

export class AppConfigService {

  public ApplicationConfig: AppConfigModel = new AppConfigModel();
  private _isLoaded: boolean = false;
  private _appConfigModel = new AppConfigModel();
  public sideNavState: Subject<boolean> = new Subject(); //Dont remove its for title show...
  public roleBasedsub :any= new Subject(); //Dont remove its for Rolebased show...


  constructor(private http: HttpClient) {
    this.setValue();
  }


  
  setValue() {
    this.http.get('assets/appsettings.json').map((res: any)  => {
          const configData = JSON.stringify(res);
          this._appConfigModel.ApiEndPoint = JSON.parse(configData).apiEndPoint;
          this.ApplicationConfig.ApiEndPoint = JSON.parse(configData).apiEndPoint;
          this._isLoaded = true;
        }
      );
  }

}

