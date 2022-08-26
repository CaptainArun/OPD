import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppConfigService } from "../app.config.service";

@Injectable()
export class CustomHttpService {
  private baseUrl!: string;
  private httpOptions: any;
  private httpHeaders!: HttpHeaders;
  private _isLoaded: boolean = false;

  constructor(private http: HttpClient, private appConfig: AppConfigService, private router: Router) {
    this.getBaseUrl();
    this.baseUrl = this.appConfig.ApplicationConfig.ApiEndPoint;
    this.httpHeaders = new HttpHeaders(
      //{
      //   'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin': '*',
      //   'Cache-Control': 'no-cache',
      //   'DataBaseName': 'Global_Master',
      //   'offSet': new Date().getTimezoneOffset().toString()
      // }
    );
  }


  //get BaseUrl
  
  getBaseUrl(): Promise<any> {
    if (this._isLoaded) {
      return Promise.resolve((res: any) => true);
    }
    else {
      return this.http.get('assets/appsettings.json')
        .toPromise().then
        (
          res => {
            const configData = JSON.stringify(res);
            this.appConfig.ApplicationConfig.ApiEndPoint = JSON.parse(configData).apiEndPoint;
            this._isLoaded = true;
          }
        );
    }
  }


  addUserToken(): void {

    if (!this.httpHeaders.has('Authorization')) {
      const jwtToken = localStorage.getItem('token');
      this.httpHeaders.set('Authorization', 'Bearer ' + jwtToken);
    }
    
  }


  async get(url: string, data?: any): Promise<any> {
    return this.getBaseUrl().then(res => {

      this.baseUrl = this.appConfig.ApplicationConfig.ApiEndPoint;
      this.httpOptions = {
        headers: this.httpHeaders
      };
      this.addUserToken();
     console.log(this.baseUrl + url, this.httpOptions);
      return this.http.get(this.baseUrl + url, this.httpOptions)
        .toPromise()
        .catch((err): any => {
          if (err.ErrorCode === 401) {
            this.router.navigate(['login']);
          }
          else {
            return new Promise(err);
          }
        }
        );
    }
    );
  }


  async post(url: string, data?: any): Promise<any> {

    return this.getBaseUrl().then
      (res => {
        this.baseUrl = this.appConfig.ApplicationConfig.ApiEndPoint;
        this.httpOptions = {
          headers: this.httpHeaders
        };
        this.addUserToken();
        return this.http.post(this.baseUrl + url, data, this.httpOptions)
          .toPromise()
          .catch((err): any => {
            if (err.ErrorCode === 401) {
              this.router.navigate(['login']);
            }
            else {
              return Promise.reject(err);
            }
          }
          );
      }
      );
  }




}
