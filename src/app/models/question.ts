import { Quiz } from "./quiz";

export class Question {
    "questionId": Number;
    "questionContent": String;
    "quizType": Quiz;
    "questionTypeId": Number;
    "answerContent": String;
    "correctAnswer": String;
    "numberOfAnswers"?: Number;
    "img"?: String;  
}