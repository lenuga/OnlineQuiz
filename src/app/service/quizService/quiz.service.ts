import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  questions : any[] = [];
  seconds! : number;
  timer: any;
  qnProgress! : number;
  correctAnswerCount: number = 0;

 constructor(private http: HttpClient) { }
   displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
   }

  //  getParticipantName() {
  //   var user = JSON.parse(localStorage.getItem('user'));
  //   return user.username;
  // }

  createUserAnswer(para: any):Observable<any> {
    const url = `https://localhost:44307/api`;
    console.log(para);
    return this.http.post<any>(url, para);
  }

createQuiz(params: any):Observable<any> {
  const url = `https://localhost:44307/api/Questions/create`;
  console.log(params);
  return this.http.post<any>(url, params);
}

updateQuiz(update: any){
    const url =`https://localhost:44307/api/Questions/${update.questionId}`;
    debugger
    console.log(update);
    return this.http.put<any>(url, update);   
}
getAll(){
  const url = 'https://localhost:44307/api/Questions/getAll';
  return this.http.get<any[]>(url);
}
 getQuizs() {
    const url =`https://localhost:44307/api/Questions/answer`;      //random 10 questions
    return this.http.get<any[]>(url);
  }

deleteQuiz(questionId: number) {
    const url =`https://localhost:44307/api/Questions/${questionId}`;
  return this.http.delete<any>(url);
  }
  getQuizByQuestionId(questionId: number) {
    const url =`https://localhost:44307/api/Questions/${questionId}`;
    return this.http.get<any>(url);
  }
  
   quizDetails(questionId: number) {
     const url = `https://localhost:44307/api/Questions/${questionId}`;
     return this.http.get<any>(url);
   }
  
  /////////////////////////


  createText(params: any):Observable<any> {
    const url = `https://localhost:44307/api/TextQuestions/createtext`;
   
    console.log(params);
    return this.http.post<any>(url, params);
  }

  updateText(update: any){
    const url =`https://localhost:44307/api/TextQuestions/${update.textId}`;
    debugger
    console.log(update);
    return this.http.put<any>(url, update);
    
  }
  getTexts() {
    const url =`https://localhost:44307/api/TextQuestions/textquiz`;
    return this.http.get<any[]>(url);
  }
  deleteText(textId: number) {
    const url =`https://localhost:44307/api/TextQuestions/${textId}`;
  return this.http.delete<any>(url);
  }
  getTextByTextId(textId: number) {
    const url =`https://localhost:44307/api/TextQuestions/${textId}`;
    return this.http.get<any>(url);
  }
  
   textDetails(textId: number) {
     const url = `https://localhost:44307/api/TextQuestions/${textId}`;
     return this.http.get<any>(url);
   }
  
  //  getAll(): Observable<any> {        
  //   const url =`https://localhost:44307/api/TextQuestions`;
  //   return this.http.get<any[]>(url);
  // }
///////////////
createMcq(params: any):Observable<any> {
    const url = `https://localhost:44307/api/McqQuestions/createmcq`;
   debugger
    console.log(params);
    return this.http.post<any>(url, params);
  }

  updateMcq(update: any){
    const url =`https://localhost:44307/api/McqQuestions/${update.mcqId}`;
    debugger
    console.log(update);
    return this.http.put<any>(url, update);
    
  }
  getMcqs() {
    const url =`https://localhost:44307/api/McqQuestions/mcqquiz`;
    return this.http.get<any[]>(url);
  }
  deleteMcq(mcqId: number) {
    const url =`https://localhost:44307/api/McqQuestions/${mcqId}`;
  return this.http.delete<any>(url);
  }
  getMcqByMcqId(mcqId: number) {
    const url =`https://localhost:44307/api/McqQuestions/${mcqId}`;
    return this.http.get<any>(url);
  }
  
   mcqDetails(mcqId: number) {
     const url = `https://localhost:44307/api/McqQuestions/${mcqId}`;
     return this.http.get<any>(url);
   }
  
   getMcqAll(): Observable<any> {        
    const url =`https://localhost:44307/api/McqQuestions`;
    return this.http.get<any[]>(url);
  }
  
}
