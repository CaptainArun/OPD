import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from '../login/loginModel/login.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject({});
  
  userModel$: any = {
    UserName: "muralikrishnan",
    Password: "Welcome@123",
    UserPhone: "9003727472",
    UserEmail: "muralikrishnan.ramakrishnan@bmsmartware.com",
    UseProfileImg:"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"
  };

  constructor(private http: HttpClient) { }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  loginAuthenticate(userModel: Login) {

    let dt: any = userModel;

    return this.http.post('https://jsonplaceholder.typicode.com/posts', userModel).pipe(map(user => {

      if (user &&  dt.username == "muralikrishnan.ramakrishnan@bmsmartware.com" && dt.password == "Welcome@123" ) {

        this.currentUserSubject.next(this.userModel$);  
        
        localStorage.setItem('currentUser', JSON.stringify(this.userModel$));
      }
      else {
        this.currentUserSubject.next(null);
        return null;
      }
      return user;
    })
    
    );
     /*
     authendicate(login: Login): any {
        return this.http.post('/Auth/UserAuthendicate', login);
               }

      return this.http.post<any>(`/users/authenticate`, { username, password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }
            return user;
        }));

      */
  }



  logout() {
    //remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


}
