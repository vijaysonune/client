import { Member } from './../_models/member';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl= environment.apiUrl;

  constructor(private http : HttpClient) { }


  getMembers() {
   return this.http.get<Member[]>(this.baseUrl+'Users');
  }

  getMember(username: any) {
    return this.http.get<Member>(this.baseUrl+'Users/'+username);
   }
}
