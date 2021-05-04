import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/service/quizService/quiz.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-mcq-quiz',
  templateUrl:'./mcq-quiz.component.html',
  styleUrls: ['./mcq-quiz.component.css']
})
export class McqQuizComponent implements OnInit {
  // choosenValue: string;
  // type: boolean = false;
  questionId! : number;
  mcqForm! : FormGroup;
  choosenValue! : string;
  type: boolean = false;
  isAddMode!: boolean;
  loading = false;
  submitted = false;


  constructor( private formBuilder: FormBuilder,
               private quizService: QuizService, 
               private toastr: ToastrService,
               private route: ActivatedRoute,
               private router: Router ) { 
       }

  ngOnInit(): void {
     this.mcqForm = this.formBuilder.group({
      questionContent:["", Validators.required],
      questionTypeId:[2],
      img:[""],
      type: [""],
      answerContent_a: [""],
      answerContent_b: [""],
      correctAnswer: [""],
      answerContent: [""],
      mcqanswerContent:[""],
      numberOfAnswers:[""],
      answers: new FormArray([]),            //answers
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
       const value = this.mcqForm.value;
       const json:any = {};
      json.questionContent = value.questionContent;
      json.questionTypeId = value.questionTypeId;
      json.ans_a = [];
      json.ans_b = [];
      json.ans_a.push({"answerContent" : value.answerContent, "correctAnswer" : value.correctAnswer, "questionId" : -1})
      json.ans_b.push({"answerContent" : value.answerContent, "correctAnswer" : value.correctAnswer, "questionId" : -1})
    
    let numberOfAnswers = 0;
     for (let i = 0; i < numberOfAnswers; i++){
           json.ans.push({"answerContent" : value.answerContent, "correctAnswer" : value.correctAnswer, "questionId" : -1})
        }
     //   json.ans.push({"answerContent" : value.answerContent, "correctAnswer" : value.correctAnswer, "questionId" : -1})
        json.answers = [json.ans_a , json.ans_b];
        // json.answers = [];
        // json.answers.push({"answerContent" : value.answerContent, "correctAnswer" : value.correctAnswer, "questionId" : -1})
         console.log(json);
       
        this.quizService.createQuiz(json)
            .pipe(first())
            .subscribe(() => {
                this.toastr.success('Mcq Quiz added!!!');
                this.router.navigate(['/admin-home/list-question'], { relativeTo: this.route });            })
            .add(() => this.loading = false);
    }

    updatequiz(): void {

         this.mcqForm.value.questionId = +this.questionId;

        if(this.questionId){
        this.quizService.updateQuiz(this.mcqForm.value)
            .pipe(first())
            .subscribe(() => {
                this.toastr.success('Mcq Quiz updated');
                // this.router.navigate([''], { relativeTo: this.route });
            },err => {   
             this.toastr.error('error!'); 
          })
            .add(() => this.loading = false);
        }  
    }
          
//     chooseQuiz(event: any){
//     console.log(event.target.value);
//     this.choosenValue = event.target.value;
//     this.choosenValue == 'Text'? this.type = true: this.type = false;
//   }


     onReset(event: any) {
        // reset whole form back to initial state
        this.submitted = false;
        this.mcqForm.reset();

    }
selectType(event: any){
    console.log(event.target.value);
}
     onChangeAnswers(e: any) {
         console.log(e.target.value);
        const numberOfAnswers = e.target.value || 0;
        if (this.t.length < numberOfAnswers) {
            for (let i = this.t.length; i < numberOfAnswers; i++) {
                console.log(numberOfAnswers);
                this.t.push(this.formBuilder.group({
                          answerContent: [''],    
                }));
            }
        } else {
            for (let i = this.t.length; i >= numberOfAnswers; i--) {
                this.t.removeAt(i);
            }
        }
    }
}
