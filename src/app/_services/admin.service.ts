import { Photo } from './../_models/photo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }

  getUsersWithRoles()
  {
    return this.http.get<Partial<User[]>>(this.baseUrl + 'admin/users-with-roles')
  }

  updateUserRoles(username : string,roles : string[])
  {
    console.log( "updateUserRoles"+ JSON.stringify(roles));
    return this.http.post(this.baseUrl + 'admin/edit-roles/'+ username +'?roles='+ roles ,{})
  }

  getPhotosForApproval()
  {
    return this.http.get<Partial<Photo[]>>(this.baseUrl + "admin/GetPhotoForApproval");
  }

  approvePhoto(photo : Photo)
  {
    return this.http.put(this.baseUrl + "admin/ApprovePhoto",photo);
  }

  rejectPhoto(id : number)
  {
    return this.http.delete(this.baseUrl + "admin/reject-photo-byAdmin/"+id);
  }
}
