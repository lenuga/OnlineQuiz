import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/service/quizService/quiz.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 
  constructor(private quizService : QuizService,private router : Router) { }

  ngOnInit(): void {
    this.quizService.getQuizs().subscribe((data: any)=>{
         this.quizService.question = data;
    }
    );
  }

 startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  

  // signout() {
  //   localStorage.clear();
  //   clearInterval(this.quizService.timer);
  //   this.router.navigate(['/login-page']);
  // }
}
 
}

