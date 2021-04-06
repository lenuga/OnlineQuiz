import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
    loginForm: FormGroup ;
    loading = false;
    submitted = false;
    invalidLogin: boolean = false;
    token: any;
   

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private http : HttpClient
  ) { 
    this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
  }

  ngOnInit() { }

   // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        
  const credentials = {
    username: this.loginForm.value.username,
    password: this.loginForm.value.password
  }

  const helper = new JwtHelperService();
 
  this.http.post<any>("https://localhost:44307/api/token/login", credentials)
  .subscribe(response => {
 
    const decodedToken = helper.decodeToken(response.data);
  //debugger  
    console.log(decodedToken);
    localStorage.setItem('token', response.data);
    this.invalidLogin = false;
   // decodedToken.UserType == "admin" ? this.router.navigate(["/admin-home"]) : this.router.navigate(["/home"]);
   if(decodedToken.UserType === "Admin")
    {
       this.router.navigate(["/admin-home"]);
    }
    else
    {
      this.router.navigate(["/home"]);
    }
   
  }, err => {
    this.invalidLogin = true;       
  });
}
}

