import { User } from './../_models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl=environment.apiUrl;
 private CurrentSourseUser =new ReplaySubject<User>(1);
 currentUser$ = this.CurrentSourseUser.asObservable();
  

  constructor(private http : HttpClient) {

   }

   login(model: User)
   {
    return this.http.post(this.baseUrl + "account/login", model).pipe(
      map((response : any) => {
        const user= response;
        if(user){
        localStorage.setItem("user", JSON.stringify(user));
        this.CurrentSourseUser.next(user);
        }
       })
      ) 
   }

   register(model:any)
   {
    return this.http.post<User>(this.baseUrl + "account/register", model).pipe(
      map((response : User) => {
        const user= response;
        if(user){
        localStorage.setItem("user", JSON.stringify(user));
        this.CurrentSourseUser.next(user);
        } return user;
       })
      ) 
   }

   setCurrentUser(user : User)
   {
    this.CurrentSourseUser.next(user);
   }

   logout(){
     localStorage.removeItem("user");
     this.CurrentSourseUser.next();
   }

}
