import { PresenceService } from './presence.service';
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
  

  constructor(private http : HttpClient, private presence : PresenceService) {

   }

   login(model: User)
   {
    return this.http.post<User>(this.baseUrl + "account/login", model).pipe(
      map((response : User) => {
        const user= response;
        if(user){
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
        }
       })
      ) 
   }

   register(model: User)
   {
    return this.http.post<User>(this.baseUrl + "account/register", model).pipe(
      map((response : User) => {
        const user= response;
        if(user){
        this.setCurrentUser(user);   
        this.presence.createHubConnection(user);     
        } return user;
       })
      ) 
   }

   setCurrentUser(user : User)
   {
     user.roles=[];
     const roles= this.getDecodeToken(user.token).role;
     Array.isArray(roles) ? user.roles= roles : user.roles.push(roles);
     localStorage.setItem("user", JSON.stringify(user));
     this.CurrentSourseUser.next(user);
   }

   logout(){
     localStorage.removeItem("user");
     this.CurrentSourseUser.next(null);
     this.presence.stopHubConnection();
   }

   getDecodeToken(token){
     //console.log(window.atob(token.split('.')[1]));
     return JSON.parse(window.atob(token.split('.')[1]));

   }

}
