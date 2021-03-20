import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode =false;
  users : any = {};

  constructor(private http : HttpClient) {
    this.http.get("http://localhost:49716/api/Users").subscribe(response => {
       this.users= response;});
    }
   
 

  ngOnInit(): void {
  }

  registerToggle(){
    this.registerMode = ! this.registerMode;
  }

  cancelEmitter(event : boolean){
    this.registerMode= event;
  }

}
