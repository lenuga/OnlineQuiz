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

  constructor( private quizService: QuizService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.quizService.getQuizs().subscribe(data => {
      this.questions = data;
      console.log(data);
     });
  }

  deleteQuiz(id: number){
  this.quizService.deleteQuiz(id).subscribe(data => {
    console.log(data);
    this.router.navigate(['/admin-home/list-question'], { relativeTo: this.route });
  });
}
updateQuiz(id: number){
  this.router.navigate(['/admin-home/create-question/' + id]);
}

  quizDetails(id: number){
  this.router.navigate(['/admin-home/textQuiz-details/'+ id]);
}   
 
}
