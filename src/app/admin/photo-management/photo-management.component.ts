import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Photo } from './../../_models/photo';
import { AdminService } from './../../_services/admin.service';
import { Component, OnInit } from '@angular/core';
import { RolesMadalComponent } from 'src/app/modals/roles-madal/roles-madal.component';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {

  photos : Partial<Photo[]>;
  bsModalRef : BsModalRef;

  constructor(private adminService : AdminService, private modalService : BsModalService) { }

  ngOnInit(): void {
    this.getUnApprovedPhotos();
  }

  getUnApprovedPhotos()
  {
    this.adminService.getPhotosForApproval().subscribe(photo => {
      this.photos= photo;
    })
  }

  approvePhoto(photo : Photo)
  {
      this.adminService.approvePhoto(photo).subscribe( () =>{
      this.photos.splice(this.photos.findIndex(m=> m.id === photo.id),1);

    });     
   

  }

  rejectPhoto(id : number)
  {
    this.adminService.rejectPhoto(id).subscribe(() =>{
      this.photos.splice(this.photos.findIndex(m=> m.id === id),1);
    });    
  }

}
