import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/service/quizService/quiz.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 questions: any[] =[];
 answers: any[] =[];
 questionTypeId! : number;
 qnProgress! : number;
 questionId! : number; 
 choice! : any;


  constructor(public quizService: QuizService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.quizService.seconds = 0;
    this.quizService.qnProgress = 0;
    let progress = this.quizService.qnProgress;
    this.quizService.getQuizs().subscribe(data => {
      this.questions = data;
      this.startTimer();
      console.log(data);
      //  const array1 = data;
      //  array1.forEach(element => console.log(element));
     });

    
    // this.service.getQuizs().subscribe((data: any)=>{
    //      this.service.questions = data;
    //      this.startTimer();
    // }
    // );

    // this.questionId = this.route.snapshot.paramMap.get('questionId');
    //   console.log(this.questionId);

    //  this.service.getQuizs().subscribe(data => {
    //   this.questions = data;
    //   console.log(data);
    //  });
  }


 startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);

}
 answer(questionId: number, choice:any){
      this.questions[this.quizService.qnProgress].answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.questions));
    console.log(this.questions);
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
    if (this.quizService.qnProgress == 10) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['/end-user']);
    }
 }
// radioChecked(id: number, i:any){
//     this.answers.forEach(answer =>{
//      if(answer.id !== id){
//            answer.selected = false;
//        }else{
//             answer.selected = true;
//             }
//     });
//   }
}

