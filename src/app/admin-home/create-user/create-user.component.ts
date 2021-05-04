import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
   userId! : number;
  createForm! :FormGroup;
  isAddMode! : boolean;
  loading = false;
  submitted = false;

  constructor( private fromBuilder: FormBuilder,
               private service: ServiceService, 
               private toastr: ToastrService, 
               private route: ActivatedRoute, 
               private router: Router) { }
    
  ngOnInit(): void {
         this.createForm = this.fromBuilder.group({
      // userId: [null],
      firstName:["", Validators.required],
      lastName:["", Validators.required],
      emailId:["", [Validators.required, Validators.email]],
      address:["", Validators.required],
      phoneNo:["", [Validators.required,  Validators.pattern("^[0-9]*$")]],
      userType:["", Validators.required],
      username:["", Validators.required],
      password:["", Validators.required],
     
    });

       
   this.userId = this.route.snapshot.params['userId'];
    console.log(this.userId);
    this.isAddMode = !this.userId;

        if (!this.isAddMode) {
            this.service.getUserByUserId(this.userId)
                .pipe(first())
                .subscribe(x => this.createForm.patchValue(x));
        }

        
  }


  get f() { return this.createForm.controls; }

  onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.createForm.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    createUser(): void {
        this.service.createUser(this.createForm.value)
            .pipe(first())
            .subscribe(() => {
                this.toastr.success('User added Successfully!!!');
                this.router.navigate(['/admin-home/user-list'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }

     updateUser(): void{
      this.createForm.value.userId = +this.userId;
      if(this.userId != null)
      {
        this.service.updateUser(this.createForm.value)
            .pipe(first())
            .subscribe(() => {
                this.toastr.success('User updated Successfully!!!');
                this.router.navigate(['/admin-home/user-list'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
      }
    }

}
