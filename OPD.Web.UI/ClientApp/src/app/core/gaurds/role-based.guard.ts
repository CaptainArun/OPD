import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { CustomHttpService } from '../custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class RoleBasedGuard implements CanActivate, CanActivateChild, CanLoad, CanDeactivate<unknown> {

  constructor(private authService: AuthService, private customHttpSvc: CustomHttpService,) {
    this.customHttpSvc.getDbName(localStorage.getItem('DatabaseName'));    
  }

  //canLoad

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    let moduleData = route.data[0].DBmodulename;
    let iscanLoadAuthorizedData: boolean;
    await this.authService.isAuthorizedModulesForCurrentUser(moduleData).then(res => {
      iscanLoadAuthorizedData = res;
      // console.log("canLoad-"+ moduleData+"-"+ res);
    });

    return iscanLoadAuthorizedData;

  }

  //canActivate

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let moduleData = route.data[0].DBmodulename;
    let iscanActivateAuthorizedData: boolean;

    await this.authService.isAuthorizedModulesForCurrentUser(moduleData).then(res => {
      iscanActivateAuthorizedData = res;
      // console.log("canActivate-"+ moduleData+"-"+ res);

    });
    return iscanActivateAuthorizedData;

  }



  //canActivateChild

  async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    let moduleData = childRoute.data[0].DBmodulename;
    let isAuthorizedData: boolean;
    await this.authService.isAuthorizedModulesForCurrentUser(moduleData).then(res => {
      isAuthorizedData = res;
    });
    return isAuthorizedData;

  }


  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;

  }

  isAuthorized(modulepathname: any): any {
    let isAuthorizedData: boolean;
    this.authService.isAuthorizedModulesForCurrentUser(modulepathname).then(res => {
      isAuthorizedData = res;
    });
    return isAuthorizedData;
  }
}
