import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  searchname: string = '';
  config: any;

  constructor(private service: ServiceService, private router: Router, private route: ActivatedRoute) { this.config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems:this.users.length
  };
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe(data => {
      this.users = data;
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems:this.users.length
      };
  });
  }

  deleteUser(id: number){
  this.service.deleteUser(id).subscribe(data => {
    console.log(data);
    this.service.getUsers().subscribe(data => {
      this.users = data;
  });
  });
}
updateUser(id: number){
   this.router.navigate(['/admin-home/create-user/' + id]); 
}
userDetails(id: number){
  this.router.navigate(['/admin-home/user-details/'+ id]);
}
//Serach By Name
searchByName(){
  if(this.searchname){
    this.service.getUsers().subscribe(data => {
      this.users = data;
      this.users= this.users.filter(p => p.firstName.toLowerCase().includes(this.searchname.toLowerCase()));
  });    
  }else {
    this.service.getUsers().subscribe(data => {
      this.users = data;
  });
  }
}

pageChanged(event: any){
  console.log(event);
  this.config.currentPage = event; 
}

}
