import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { QuizService } from '../service/quizService/quiz.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  [x: string]: any;
  questions: any[] = [];
  userAns : any[] = [];
  loading: boolean = false;
  submitted: boolean = false;
  form!: FormGroup;


  constructor(  private router: Router, 
                private jwtHelper: JwtHelperService,
                private quizService: QuizService,
                private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
         userAnswer: [""],
    });
    this.quizService.getQuizs().subscribe( data =>{
      this.questions = data;
    });
  }

  // get f() { return this.form.controls; }

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
  
  onSubmit(){
    this.submitted = true;
    this.loading = true;

    this.quizService.createUserAnswer(this.userAns).subscribe(data =>{
     this.userAns = data;
     this.form.reset();
      this.toastr.success('Congratulation !!!You are Successfully completed!!!');
       this.router.navigate(['/end-user'], { relativeTo: this.route });
    })
  }
}
