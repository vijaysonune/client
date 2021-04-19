import { PresenceService } from './_services/presence.service';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App!';
  users : any;
 

  constructor(private accountservice : AccountService, private presence : PresenceService)
  {
    

  }

  ngOnInit()
  {
    this.setCurrentUser();
            
  }

  setCurrentUser(){
    const user  : any = localStorage.getItem("user");

    if(user)
    {
      this.accountservice.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }
    
 }

 
}
