import { MessageService } from './../_services/message.service';
import { Member } from './../_models/member';
import { MembersService } from './../_services/members.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from '../_models/message';
import { AnySoaRecord } from 'node:dns';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabsets',{static : true} ) memberTabsets : TabsetComponent;

  member ={} as Member;
  galleryOptions: NgxGalleryOptions[]=[];
  galleryImages: NgxGalleryImage[]=[];
  activeTab :TabDirective;
  messages : Message[]=[];

  constructor(private memberService :  MembersService, private route : ActivatedRoute 
    , private messageService : MessageService) { }

  ngOnInit(): void {
    
    this.route.data.subscribe(data => {
      console.log("route.data : "+ JSON.stringify(data));
      this.member = data.member;
    })

    this.route.queryParams.subscribe( params => {
      console.log("params : "+params.tabs);
      params.tabs ? this.selectTab(params.tabs) : this.selectTab(0);
    })

    this.galleryOptions = [
      {
        width : '500px',
        height : '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation : NgxGalleryAnimation.Slide,
        preview: false

      }
    ]
    this.galleryImages= this.getImages();  

  }

 getImages() : NgxGalleryImage[] 
 {
   const imgUrls=[];
   for(const image of this.member.photos)
   {
     imgUrls.push({
       small: image?.url,
       medium: image?.url,
       big: image?.url
     })
   }
   return imgUrls;
 }
 
  onTabActivates(data : TabDirective)
  {
    this.activeTab=data;
    if(this.activeTab.heading ==='Messages' && this.messages.length === 0)
    {
      this.loadMessages();
    }
  }

  selectTab(tabId : number)
  {
    this.memberTabsets.tabs[tabId].active=true;
  }

  loadMessages()
  {
    this.messageService.getMessageThread(this.member.username).subscribe(response => {
      this.messages=response;

    })
  }

}
