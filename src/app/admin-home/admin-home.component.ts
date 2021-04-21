import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  isVisible! : boolean;

  constructor(private router: Router, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
  }

  isAuthenticated() {
    const token = localStorage.getItem("jwt");
    if(token && ! this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    else {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem("jwt");
    this.router.navigate(["/login-page"]);
  }
   
  // if(this.isVisible){
  // }
}
