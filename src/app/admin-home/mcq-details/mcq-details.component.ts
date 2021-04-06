import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/service/quizService/quiz.service';

@Component({
  selector: 'app-mcq-details',
  templateUrl: './mcq-details.component.html',
  styleUrls: ['./mcq-details.component.css']
})
export class McqDetailsComponent implements OnInit {
mcqId : any;
mcq={mcqId:"", questionNo:"", question:"", quizType:"", ans:"", extraAnswer:"", answer:"", numberOfAnswers:""}

  constructor( private service: QuizService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.mcqId = this.route.snapshot.paramMap.get('mcqId');
    console.log(this.mcqId);

    this.service.mcqDetails(this.mcqId).subscribe(data =>{
      this.mcq=data;
      console.warn(data);
      console.log(data);
    });
  
  }
}
