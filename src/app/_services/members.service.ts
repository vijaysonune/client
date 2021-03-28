import { Member } from './../_models/member';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl= environment.apiUrl;
  members : Member[]=[];

  constructor(private http : HttpClient) { }


  getMembers() {
    if(this.members.length > 0) return of(this.members);
   return this.http.get<Member[]>(this.baseUrl+'Users').pipe(
     map((members : Member[]) =>{
       this.members=members;
       return members;
       
     })
   )
  }

  getMember(username: any) {
    const member= this.members.find(x=> x.username=== username);
    if(member !==undefined) return of(member);
    
    return this.http.get<Member>(this.baseUrl+'Users/'+username);
    
    
   }

   updateMember(member: Member)
   {
     return this.http.put(this.baseUrl+'Users',member).pipe(
       map(() => {
         const index= this.members.indexOf(member);
         this.members[index]=member;
       })
     )
   }
}
