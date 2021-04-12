import { NgForm } from '@angular/forms';
import { MessageService } from './../_services/message.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../_models/message';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input('username') username: string;
  messageContent : string;
  @ViewChild('messageForm') messageForm: NgForm;


  @Input('messages') messages : Message[];

  constructor(private messageService : MessageService) { }

  ngOnInit(): void {  
  }

  sendMessage()
  {
    this.messageService.sendMessages(this.username,this.messageContent).subscribe(message => {
      this.messages.push(message);
      this.messageForm.reset();
    })
  }

 

}
