import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { PaginationResult } from "../_models/pagination";


export function getPaginatedResult<T>(url,params,http : HttpClient){
    const paginationResult : PaginationResult<T>=new PaginationResult<T>();

    return http.get<T>(url,{observe:'response',params}).pipe(
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

  export function getPaginationHeader(page : number, itemPerPage : number){
    let params= new HttpParams();

      params = params.append("PageNumber", page.toString());
      params = params.append("PageSize", itemPerPage.toString());

      return params;
  }