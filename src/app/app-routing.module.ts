import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateQuestionComponent } from './admin-home/create-question/create-question.component';
import { CreateUserComponent } from './admin-home/create-user/create-user.component';
import { ListQuestionComponent } from './admin-home/list-question/list-question.component';
import { McqDetailsComponent } from './admin-home/mcq-details/mcq-details.component';
import { McqListComponent } from './admin-home/mcq-list/mcq-list.component';
import { QuizDetailComponent } from './admin-home/quiz-detail/quiz-detail.component';
import { UserDetailComponent } from './admin-home/user-detail/user-detail.component';
import { UserListComponent } from './admin-home/user-list/user-list.component';
// import { AuthenticationGuard } from './authentication.guard';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './Login/login-page/login-page.component';
import { McqQuizComponent } from './mcq-quiz/mcq-quiz.component';

const routes: Routes = [

  { path: 'login-page', component: LoginPageComponent},
  {path: 'home', component: HomeComponent },
  {path: 'admin-home', component: AdminHomeComponent, 
      children: [
      //{path: 'create-user', component: CreateUserComponent, canActivate: [AuthenticationGuard], data: { authorities: ['admin']}},
     {path: 'create-user', component: CreateUserComponent},
     {path: 'create-user/:userId', component: CreateUserComponent},
     {path: 'user-list', component: UserListComponent},
     {path: 'user-list/:userId', component: UserListComponent},
     {path: 'user-details', component: UserDetailComponent},
     {path: 'user-details/:userId', component: UserDetailComponent},
     {path: 'create-question', component: CreateQuestionComponent},
     {path: 'create-question/:questionId', component: CreateQuestionComponent},
     {path: 'list-question', component: ListQuestionComponent},
      {path: 'list-question/:questionId', component: ListQuestionComponent},
      {path: 'textQuiz-details', component: QuizDetailComponent},
      {path: 'textQuiz-details/:questionId', component: QuizDetailComponent},
      {path: 'create-mcq', component: McqQuizComponent},
      {path: 'create-mcq/:mcqId', component: McqQuizComponent},
      {path: 'mcq-list', component: McqListComponent},
      {path: 'mcq-list/:mcqId', component: McqListComponent},
      {path: 'mcq-details', component: McqDetailsComponent},
      {path: 'mcq-details/:mcqId', component: McqDetailsComponent},
    ]},
      { path: '', redirectTo: 'login-page',  pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
