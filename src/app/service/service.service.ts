import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
 

  constructor(private httpClient: HttpClient) { }

  createUser(params: any):Observable<any> {
    const url = `https://localhost:44307/api/UserInfoes/create`;
    //debugger
    console.log(params);
    return this.httpClient.post<any>(url, params);
  }

  updateUser(update: any){
    const url =`https://localhost:44307/api/UserInfoes/${update.userId}`;
    console.log(update);
    return this.httpClient.put<any>(url, update);
    
  }
  getUsers() {
    const url =`https://localhost:44307/api/UserInfoes/users`;
    return this.httpClient.get<any[]>(url);
  }
  deleteUser(userId: number) {
    const url =`https://localhost:44307/api/UserInfoes/${userId}`;
  return this.httpClient.delete<any>(url);
  }
  getUserByUserId(userId: number) {
    const url =`https://localhost:44307/api/UserInfoes/${userId}`;
    return this.httpClient.get<any>(url);
  }
  
   userDetails(userId: number) {
     const url = `https://localhost:44307/api/UserInfoes/${userId}`;
     return this.httpClient.get<any>(url);
   }
  
   getAll(): Observable<any> {        
    const url =`https://localhost:44307/api/UserInfoes`;
    return this.httpClient.get<any[]>(url);
  }

}
