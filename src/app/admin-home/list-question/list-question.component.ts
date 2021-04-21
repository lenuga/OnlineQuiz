import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/service/quizService/quiz.service';


@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css']
})
export class ListQuestionComponent implements OnInit {
 questions: any[] =[];
 answers: any[] =[];
 choosenValue: string = '';
 type: boolean = true;
 searchquiz: string = '';

  constructor( private quizService: QuizService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.quizService.getQuizs().subscribe(data => {
      this.questions = data;
      console.log(data);
     });
  }

  
 identify(index: number, item:any) {
      return item.id;
   }

  deleteQuiz(id: number){
  this.quizService.deleteQuiz(id).subscribe(data => {
    console.log(data);
    this.quizService.getQuizs().subscribe(x => {
      this.questions = x;
      console.log(x);
     });  
  });
}
updateQuiz(id: number){
  this.router.navigate(['/admin-home/create-question/' + id]);
}

  quizDetails(id: number){
  this.router.navigate(['/admin-home/textQuiz-details/'+ id]);
}   
 //Serach By Quiz
searchByQuiz(){
  if(this.searchquiz){
    this.quizService.getQuizs().subscribe(data => {
      this.questions  = data;
      this.questions= this.questions.filter(p => p.questionContent.toLowerCase().includes(this.searchquiz.toLowerCase()));
  });    
  }else {
    this.quizService.getQuizs().subscribe(data => {
      this.questions = data;
  });
  }
}
}
