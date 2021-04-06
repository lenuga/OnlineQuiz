import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenNotExpired } from 'angular2-jwt';
import * as jwt_decode from 'jwt-decode';
import decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthguradServiceService {
  token: string = '';  

 constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

   public getToken() {
    return localStorage.getItem('token');
  }

  
  
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return !!localStorage.getItem('token');
  }

    // canActivate() {
    //     const token = localStorage.getItem("token");

    //     if(token && !this.jwtHelper.isTokenExpired(token)){
    //         return true;
    //     }
    //     this.router.navigate(["/home"]);
    //     return false;
    // }

}
 