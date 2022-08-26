import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { Login } from '../loginModel/login.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  submitted = false;
  loginForm: FormGroup | any;
  loginModel: Login = new Login();
  loading = false;
  error = '';
  Status = '';
  public showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private AuthSvc: AuthService, private router: Router, private http: HttpClient) { }
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['muralikrishnan.ramakrishnan@bmsmartware.com', Validators.required],
      password: ['Welcome@123', Validators.required]
    });
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    else {
      this.loginModel = this.loginForm.value;
      this.AuthSvc.loginAuthenticate(this.loginModel).subscribe(
        data => {
          if (data) {
            console.log(data);
            this.error = "";
            this.Status = "Login Succesfully"
            this.router.navigate(['home/dashboard']);
          }
          else {
            this.Status = "";
            this.error = "Username or password is incorrect";
          }
        },
        error => {
          console.log(error);
        });
    }

    /* this.submitted = true;
   // stop here if form is invalid
   if (this.loginForm.invalid) {
     return;
   }
   else {
     this.loginModel = this.loginForm.value;
       this.AuthSvc.loginauthendicate(this.loginModel).then(res :any => {
         if (res.Status === 0) {
           localStorage.setItem('token', res.Result.token);
           localStorage.setItem('LoggedinUser', this.loginModel.UserName);
           this.router.navigate(['/home'])
         }
         else {
           this.loginErrorHandler(res);
         }
     }
     this.AuthSvc.authendicate(this.loginModel).pipe(first()).subscribe(
       (res: any) => {
         localStorage.setItem('token', res.Result.token);
         localStorage.setItem('LoggedinUser', this.loginModel.UserName);
         this.router.navigate([]);
       },
       (error: any) => {
         this.error = error;
       });
   }
   this.loading = false;
   }
*/

  }

  CloseError(){
    this.error="";
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}