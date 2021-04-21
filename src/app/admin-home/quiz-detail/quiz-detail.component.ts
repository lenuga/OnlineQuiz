import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/service/quizService/quiz.service';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class QuizDetailComponent implements OnInit {
questionId : any;
answers: any[] = [];
quiz={questionId:"", questionContent:"", questionTypeId:"", answers:"", answerContent:"", correctAnswer:"", answerId:""}

  constructor(private service: QuizService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.questionId = this.route.snapshot.paramMap.get('questionId');
      console.log(this.questionId);

    this.service.quizDetails(this.questionId).subscribe(data =>{
      this.quiz =data;
      console.warn(data);
      console.log(data);
    });
  
  }

}
