import { take } from 'rxjs/operators';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getPaginatedResult, getPaginationHeader } from './paginationHelper';
import { Message } from '../_models/message';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';
import { Group } from '../_models/group';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;

  private hubConnection : HubConnection;
  private messageSourceThread = new BehaviorSubject<Message[]>([]);
  public messageThread$ = this.messageSourceThread.asObservable();

  constructor(private http:HttpClient) { }

 createConnection(user : User, otherUsername : string)
 {
   this.hubConnection= new HubConnectionBuilder()
        .withUrl(this.hubUrl + "message?user="+ otherUsername , {
          accessTokenFactory : ()=> user.token         
          
        })
        .withAutomaticReconnect()
        .build();


        this.hubConnection.start().catch(error => console.log(error));        

        this.hubConnection.on("ReceiveMessageThread" , messages =>{
          this.messageSourceThread.next(messages);
        });

        this.hubConnection.on("NewMessage", message => {
          this.messageThread$.pipe(take(1)).subscribe(messages =>{
            this.messageSourceThread.next([...messages,message]);
          })
        });

        this.hubConnection.on("UpdatedGroup", (group : Group) => {
          if(group.connections.some(x=> x.username === otherUsername))
          {
            this.messageThread$.pipe(take(1)).subscribe(messages => {
              messages.forEach(message =>{
                if(!message.dateRead)
                {
                  message.dateRead= new Date(Date.now());
                }    
              })
              this.messageSourceThread.next([...messages]);
              
            });
          }
        });
   
 }

  stopConnection()
  {
    if(this.hubConnection)
    {
    this.hubConnection.stop().catch(error => console.log(error));
    }
  }

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

  async sendMessages(username : string, content : string)
   {
     return this.hubConnection.invoke("SendMessage",{ RecepientUsername : username, content})
     .catch(error => console.log(error));
   }

   deleteMessage(id : number)
   {
     return this.http.delete(this.baseUrl +'messages/' + id);
   }


}
