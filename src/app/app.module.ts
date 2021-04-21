import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './Login/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { UserComponent } from './User/user/user.component';
import { HomeComponent } from './home/home.component';
//import { AuthenticationGuard } from './authentication.guard';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateUserComponent } from './admin-home/create-user/create-user.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthenticationGuard } from './authentication.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { UserListComponent } from './admin-home/user-list/user-list.component';
import { UserDetailComponent } from './admin-home/user-detail/user-detail.component';
import { CreateQuestionComponent } from './admin-home/create-question/create-question.component';
import { ListQuestionComponent } from './admin-home/list-question/list-question.component';
import { QuizDetailComponent } from './admin-home/quiz-detail/quiz-detail.component';
import { McqQuizComponent } from './mcq-quiz/mcq-quiz.component';
import { McqDetailsComponent } from './admin-home/mcq-details/mcq-details.component';
import { McqListComponent } from './admin-home/mcq-list/mcq-list.component';
import { ResultComponent } from './result/result.component';
import { QuizService } from './service/quizService/quiz.service';
import { EndComponent } from './end/end.component';
import { NgxPaginationModule } from 'ngx-pagination';



export function tokenGetter() {
  return localStorage.getItem("jwt");
}


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UserComponent,
    HomeComponent,
    AdminHomeComponent,
    CreateUserComponent,
    UserListComponent,
    UserDetailComponent,
    CreateQuestionComponent,
    ListQuestionComponent,
    McqQuizComponent,
    QuizDetailComponent,
    McqDetailsComponent,
    McqListComponent,
    ResultComponent,
    EndComponent,

 
  ],
  exports:[],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44307"],
        disallowedRoutes: []
      }
    }),

  ],
  providers: [QuizService,
              AuthenticationGuard,
             { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}