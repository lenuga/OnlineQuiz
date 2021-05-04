import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userId: any;
user = {userId:"", firstName:"",lastName:"", address:"", emailId:"", phoneNo :"", username:"", userType:"" }

  constructor(private service: ServiceService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.userId = this.route.snapshot.paramMap.get('userId');
    console.log(this.userId);

    this.service.userDetails(this.userId).subscribe(data =>{
      this.user=data;
      console.warn(data);
      console.log(data);
    });
  }
 goBack(){
   this.router.navigate(['/admin-home/user-list'], { relativeTo: this.route });
 }
}
