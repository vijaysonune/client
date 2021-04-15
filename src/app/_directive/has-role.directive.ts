import { take } from 'rxjs/operators';
import { Directive, TemplateRef, ViewContainerRef, Input, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';

@Directive({
  selector: '[appHasRole]'  // *appHasRole  
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole : string[];
  user : User;

  constructor(private viewcontainer : ViewContainerRef, private templateRef : TemplateRef<any>, 
    private accountService : AccountService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
        this.user=user;
      })

     }
  ngOnInit(): void {
    // clear the voew when no user roles

    if(!this.user?.roles || this.user == null)
    {
      this.viewcontainer.clear();
      return;
    }

    if(this.user?.roles.some(r=> this.appHasRole.includes(r)))
    {
      this.viewcontainer.createEmbeddedView(this.templateRef);
    } else{
      this.viewcontainer.clear();
    }

  }

}
