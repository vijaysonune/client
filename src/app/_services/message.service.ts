import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getPaginatedResult, getPaginationHeader } from './paginationHelper';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getMessage(pageNumber,pageSize,container : string)
  {
    let params= getPaginationHeader(pageNumber,pageSize);
    params= params.append("container",container);
    return getPaginatedResult<Message[]>(this.baseUrl + "messages",params,this.http);

  }

  getMessageThread(username : string)
  {
    return this.http.get<Message[]>(this.baseUrl + 'messages/thread/' + username);
  }

  sendMessages(username : string, content : string)
   {
     return this.http.post<Message>(this.baseUrl +'messages',{ recepientUsername : username, content});
   }

   deleteMessage(id : number)
   {
     return this.http.delete(this.baseUrl +'messages/' + id);
   }


}
