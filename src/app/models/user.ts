import { Role } from "./role";

export class User {
    "userId" : number;
    "username" : string;
    "password" : string;
    "firstName" : string;
    "lastName" : string;
    "userType" : Role;
    "phoneNo" : string;
    "emailId" : string;
    "address" : string;
    token?: string;
}