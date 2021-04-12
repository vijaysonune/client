import { MembersService } from './../_services/members.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailedResolver implements Resolve<Member> {

  constructor(private memberService : MembersService) {

  }

  resolve(route: ActivatedRouteSnapshot): Observable<Member> {
   // console.log("this.memberService.getMember :"+JSON.stringify( this.memberService.getMember(route.queryParamMap.get('username'))));
    return this.memberService.getMember(route.paramMap.get('username'));
  }
}
