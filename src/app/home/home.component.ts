import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
  
  // getUrl()
  // {
  //  return "url('https://t4.ftcdn.net/jpg/02/30/37/93/240_F_230379361_GdzubTAT5hxPTuNMMQq5TkLYNKM6WoCc.jpg')";
  // }
}
