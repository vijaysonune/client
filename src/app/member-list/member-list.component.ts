import { AccountService } from './../_services/account.service';
import { UserParams } from './../_models/userParams';
import { Observable } from 'rxjs';
import { MembersService } from './../_services/members.service';
import { Member } from './../_models/member';
import { Component, OnInit } from '@angular/core';
import { Pagination, PaginationResult } from '../_models/pagination';
import { User } from '../_models/user';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members : Member[];
  pagination : Pagination;
  userParams : UserParams;
  user = {} as User ;
  genderList= [{value :'male',display :'Males'},{value :'female',display :'Females'}];


  constructor(private memberService : MembersService) {
     this.userParams=memberService.getUserParams();
   }

   loadMembers()
   {
    this.memberService.setUserParams(this.userParams);
     this.memberService.getMembers(this.userParams)
     .subscribe(response  =>{
       this.members=response.result;
       this.pagination= response.pagination;
     });
   }

   pageChanged(event : any)
   {
     this.userParams.pageNumber=event.page;
     this.memberService.setUserParams(this.userParams);
     this.loadMembers();
   }

   resetFilters(){
     this.userParams= this.memberService.resetUserParams();
     this.loadMembers();
   }





  ngOnInit(): void {
    this.loadMembers();
    
  }
  

}
