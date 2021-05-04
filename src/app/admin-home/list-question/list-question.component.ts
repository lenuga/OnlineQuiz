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
 searchquiz: string = '';
 questionId! : number; 
 orderBy: any;
 config: any;
 type! : boolean;


  constructor( private quizService: QuizService,
               private router: Router,
               private route: ActivatedRoute) { this.config = {
                 itemsPerPage: 5,
                 currentPage: 1,
                 totalItems:this.questions.length
              }; }  

  ngOnInit(): void {
     this.quizService.getAll().subscribe(data => {
      this.questions = data;
      console.log(data);
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems:this.questions.length
  };
      if(data){
        this.sortData();
      }
     });
  }

 identify(index: number, item:any) {
      return item.id;
   }

  deleteQuiz(){
  this.quizService.deleteQuiz(this.questionId).subscribe(data => {
    console.log(data);
    this.quizService.getAll().subscribe(x => {
      this.questions = x;
      console.log(x);
        this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems:this.questions.length
  };
      if(data){
        this.sortData();
      }
     }); 
     this.refresh(); 
  });
}

  // deleteQuiz(id: number){
  //   const confirm = window.confirm("Are you sure want to delete?");
  //   if(confirm){
  //       this.quizService.deleteQuiz(id).subscribe(data => {
  //   console.log(data);
  //   this.quizService.getAll().subscribe(x => {
  //     this.questions = x;
  //     console.log(x);
  //       this.config = {
  //       itemsPerPage: 5,
  //       currentPage: 1,
  //       totalItems:this.questions.length
  // };
  //     if(data){
  //       this.sortData();
  //     }
  //    });  
  // });
  //   }
  // }
updateQuiz(id: number){
      // this.router.navigate(['/admin-home/create-question/'+ id]);
     this.router.navigate(['/admin-home/create-quiz/'+ id]);
}

  quizDetails(id: number){
  this.router.navigate(['/admin-home/textQuiz-details/'+ id]);
}   
 //Serach By Quiz
searchByQuiz(){
  if(this.searchquiz){
    this.quizService.getAll().subscribe(data => {
      this.questions  = data;
      this.questions= this.questions.filter(p => p.questionContent.toLowerCase().includes(this.searchquiz.toLowerCase()));
  });    
  }else {
    this.quizService.getAll().subscribe(data => {
      this.questions = data;
  });
  }
}

pageChanged(event: any){
  console.log(event);
  this.config.currentPage = event; 
}
setDelete(id: number){
  this.questionId = id;
}

sortData(){
          this.questions = this.questions.sort((a,b)=> b.questionId - a.questionId);
}
refresh(): void {
    location.reload();
}
goToAdd(){
  this.router.navigate(['/admin-home/create-quiz'], { relativeTo: this.route })
}
}
