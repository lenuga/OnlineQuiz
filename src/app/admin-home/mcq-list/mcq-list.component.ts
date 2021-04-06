import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/service/quizService/quiz.service';

@Component({
  selector: 'app-mcq-list',
  templateUrl: './mcq-list.component.html',
  styleUrls: ['./mcq-list.component.css']
})
export class McqListComponent implements OnInit {
questions: any[] =[];

  constructor( private quizService: QuizService,
               private router: Router) { }

  ngOnInit(): void {
     this.quizService.getMcqs().subscribe(data => {
      this.questions = data;
     });
  }

  deleteMcq(id: number){
  this.quizService.deleteMcq(id).subscribe(data => {
    console.log(data);
  });
}
updateMcq(id: number){
  this.router.navigate(['/admin-home/create-mcq/' + id]);
}

  mcqDetails(id: number){
  this.router.navigate(['/admin-home/mcq-details/'+ id]);
}   
}
