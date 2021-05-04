import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/service/quizService/quiz.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  questionId! : number;
  correctAnswer! : string;
  mcqForm! : FormGroup;
  choosenValue! : string;
  type!: boolean;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  selectForm! : FormGroup;
  questionTypeId: number = 0;
   quizType! : string;




  constructor( private formBuilder: FormBuilder,
               private quizService: QuizService, 
               private toastr: ToastrService,
               private route: ActivatedRoute,
               private router: Router ) { 
       }

  ngOnInit(): void {
  this.selectForm = this.formBuilder.group({
       quizType:[""],
  })
  

     this.mcqForm = this.formBuilder.group({
      questionContent:["", Validators.required],
      questionTypeId:[,Validators.required],
      img:[""],
      answerContent: [""],
      correctAnswer: [""],
      // mcqanswerContent:[""],
      numberOfAnswers:[""],
      answers: new FormArray([]),   //answers  
      // selectForm: new FormBuilder,         
    });
    
        this.questionId = this.route.snapshot.params['questionId'];
        console.log(this.questionId);
        this.isAddMode = !this.questionId;

            if (!this.isAddMode) {
            this.quizService.getQuizByQuestionId(this.questionId)
                .pipe(first())
                .subscribe(x => this.mcqForm.patchValue(x));
        }

  }

  
   get f() { return this.mcqForm.controls; }
   get t() { return this.f.answers as FormArray; }                //answers

 onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.mcqForm.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createquiz();
        } else {
            this.updatequiz();
        }
    }

     createquiz(): void {
      console.log(this.mcqForm.value);
      const val = this.mcqForm.value;
      const json: any = {};
      json.questionContent = val.questionContent;
      json.questionTypeId = val.questionTypeId;
      json.numberOfAnswers = val.answers.length;
      json.answers = [];
      if(!this.type)
      {
       for(let i=0; i < val.answers.length ; i++){
        json.answers.push({"answerContent" : val.answers[i].answerContent, "correctAnswer" : val.answers[i].correctAnswer, "questionId" : -1});    
      }
      console.log(json);
    } 
      else
      {
       json.answers.push({"answerContent" : val.answerContent, "correctAnswer" : val.correctAnswer, "questionId" : -1});

      }

        console.log(json);
       
        this.quizService.createQuiz(json)
            .pipe(first())
            .subscribe(() => {
                this.toastr.success('Quiz added!!!');
                this.mcqForm.reset();
                this.router.navigate(['/admin-home/list-question'], { relativeTo: this.route });  
                     })
            .add(() => this.loading = false);
            
    }


       updatequiz(): void {
         console.log(this.mcqForm.value);
        
         this.mcqForm.value.questionId = +this.questionId;
          
        if(this.questionId){
      const value = this.mcqForm.value;
      const QType = this.selectForm.value;
      const json: any = {};
      json.questionId = value.questionId;
      json.questionContent = value.questionContent;
      json.questionTypeId = value.questionTypeId;
      value.questionTypeId == '1' ? this.type = true: this.type = false;
      json.numberOfAnswers = value.answers.length;
      json.answers = [];
      if(!this.type)
      {
       for(let i=0; i < value.answers.length; i++){
        json.answers.push({"answerContent" : value.answers[i].answerContent, "correctAnswer" : value.answers[i].correctAnswer, "questionId" : value.questionId});    
      }
      console.log(json);
    } 
      else
      {
       json.answers.push({"answerContent" : value.answerContent, "correctAnswer" : value.correctAnswer, "questionId" : value.questionId});

      }
        this.quizService.updateQuiz(json)
            .pipe(first())
            .subscribe(() => {
                this.toastr.success('Quiz updated');
                this.router.navigate(['/admin-home/list-question'], { relativeTo: this.route });
            },err => {   
             this.toastr.error('error!'); 
          })
            .add(() => this.loading = false);
        }  
    }
          
    chooseQuiz(event: any){
    console.log(event.target.value);
    this.choosenValue = event.target.value;
    this.choosenValue == 'Text'? this.type = true: this.type = false;
    console.log(this.selectForm.value.type);    
  }


     onReset(event: any) {
        // reset whole form back to initial state
        this.submitted = false;
        this.mcqForm.reset();
    }

    onSelectType(event: any){
      console.log(event.target.value);
    this.questionTypeId = event.target.value;
      }

     onChangeAnswers(e: any) {
         console.log(e.target.value);
        const numberOfAnswers = e.target.value || 0;
        if (this.t.length < numberOfAnswers) {
            for (let i = this.t.length; i < numberOfAnswers; i++) {
                console.log(numberOfAnswers);
                this.t.push(this.formBuilder.group({
                          answerContent: [""],
                          correctAnswer:[""],   
                }));
            }
        } else {
            for (let i = this.t.length; i >= numberOfAnswers; i--) {
                this.t.removeAt(i);
            }
        }
    }
    onCorrectAnswerSelection(event: any){
        this.correctAnswer = event.target.value;
    }
}
