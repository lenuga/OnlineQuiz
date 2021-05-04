import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/service/quizService/quiz.service';
import { first } from 'rxjs/operators';

export enum Quiz {
    Text = 'Text',
    Mcq = 'Mcq'
}
@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {
  questionId! : number;
  form! :FormGroup;
  selectForm! : FormGroup;
  choosenValue: string = '';
  type: boolean = true;
  isAddMode! : boolean;
  loading = false;
  submitted = false;
  isAdd! : boolean;



  constructor( private formBuilder: FormBuilder, 
               private quizService: QuizService, 
               private toastr: ToastrService, 
               private route: ActivatedRoute,
                private router: Router) { 
               
    }

  ngOnInit(): void {
//  this.selectForm = this.formBuilder.group({
//     type:[""],
//  });
    this.form = this.formBuilder.group({  
      questionContent: ["", Validators.required],
      questionTypeId: [1],
      answerContent: [""],
      correctAnswer: [""],
      // type: ["Text"],
      img:[""],
    });

        this.questionId = this.route.snapshot.params['questionId'];
        console.log(this.questionId);
        this.isAddMode = !this.questionId;

            if (!this.isAddMode) {
            this.quizService.getQuizByQuestionId(this.questionId)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
  }
    

   get f() { return this.form.controls; }
 
  onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
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
       
       console.log(this.form.value);
       const value = this.form.value;
       const json:any = {};
      json.questionContent = value.questionContent;
      json.questionTypeId = value.questionTypeId;
      // json.type = value.type;

      json.answers = [];
      json.answers.push({"answerContent" : value.answerContent, "correctAnswer" : value.correctAnswer, "questionId" : -1})

      console.log(json);

        this.quizService.createQuiz(json)
            .pipe(first())
            .subscribe(() => {
                this.toastr.success('Quiz added!!!');
                this.router.navigate(['/admin-home/list-question'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }

    updatequiz(): void {

         this.form.value.questionId = +this.questionId;
         
        if(this.questionId != null)
        {
      console.log(this.form.value);
      //  const value = this.form.value;
      //  const json:any = {};
      // json.questionContent = value.questionContent;
      // json.questionTypeId = value.questionTypeId;
      // json.type = value.type;

      // json.answers = [];
      // json.answers.push({"answerContent" : value.answerContent, "correctAnswer" : value.correctAnswer, "questionId" : -1})

      // console.log(json);
        this.quizService.updateQuiz(this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.toastr.success('Text Quiz updated');
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
  }

}
