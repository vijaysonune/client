import { AccountService } from './account.service';
import { element } from 'protractor';
import { UserParams } from './../_models/userParams';
import { Member } from './../_models/member';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { map, retry, take } from 'rxjs/operators';
import { PaginationResult } from '../_models/pagination';
import { User } from '../_models/user';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl= environment.apiUrl;
  members : Member[]=[];  
  memberCache = new Map();
  user : User;
  userParams : UserParams;

  constructor(private http : HttpClient,private accountService : AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(userValue => {
      this.user = userValue;
      this.userParams= new UserParams(userValue);

    })
  }

  getUserParams()
  {
    return this.userParams;
  }

  setUserParams(params: UserParams){
    this.userParams=params;
  }

  resetUserParams()
  {
    this.userParams=new UserParams(this.user);
    return this.userParams;
  }

  addLike(username : string)
  {
    return this.http.post(this.baseUrl +"likes/" + username, {});
  }

  getLikes(predicate : string,pageNumber : number,itemPerPage: number )
  {
    let params= this.getPaginationHeader(pageNumber,itemPerPage)
    params= params.append('predicate',predicate);
    return this.getPaginatedResult<Partial<Member[]>>(this.baseUrl +"likes",params)
  }


  getMembers(userParams : UserParams) {  
   // debugger;
    console.log(Object.values(userParams).join('-'));
    
   var response= this.memberCache.get(Object.values(UserParams).join('-'));
   if(response)
   {     
     return of(response);
   }

    let params= this.getPaginationHeader(userParams.pageNumber,userParams.pageSize);

    params = params.append("minAge", userParams.minAge.toString());
    params = params.append("maxAge", userParams.maxAge.toString());
    params = params.append("gender", userParams.gender);
    params = params.append("orderBy", userParams.orderBy);

    return this.getPaginatedResult<Member[]>(this.baseUrl+'users',params)
    .pipe(map(response =>{
      this.memberCache.set(Object.values(userParams).join('-'),response);
      return response;
    }))
  }  

  getMember(username: string) {
    const member= [...this.memberCache.values()]
        .reduce((arr,elem) => arr.concat(elem.result),[])
        .find((member : Member) => member.username === username);

        if(member)
        {
          return of(member);
        }
       
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

   setMainPhoto(photoId : number)
   {
     return this.http.put(this.baseUrl+'Users/set-main-photo/'+photoId,{});     
   }

   deletePhoto(photoId : number)
   {
    return this.http.delete(this.baseUrl+'Users/delete-photo/'+photoId); 
   }


   private getPaginatedResult<T>(url,params){
    const paginationResult : PaginationResult<T>=new PaginationResult<T>();

    return this.http.get<T>(url,{observe:'response',params}).pipe(
      map(response=>{
        paginationResult.result=response.body;
 
        if(response.headers.get("Pagination") !== null)
        {
         paginationResult.pagination= JSON.parse(response.headers.get("Pagination"));
        }    
        return paginationResult;  
      })          
    )  
  }

  private getPaginationHeader(page : number, itemPerPage : number){
    let params= new HttpParams();

      params = params.append("PageNumber", page.toString());
      params = params.append("PageSize", itemPerPage.toString());

      return params;
  }
}
