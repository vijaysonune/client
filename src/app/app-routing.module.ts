import { ServerErrorComponent } from './server-error/server-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TestErrorsComponent } from './test-errors/test-errors.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberListComponent } from './member-list/member-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [
  {path : ' ' , component :HomeComponent},
  {
    path :'',
    runGuardsAndResolvers : 'always',
    canActivate : [AuthGuard],
    children:[
      {path : 'members/:id' , component : MemberDetailComponent , canActivate : [AuthGuard]},
      {path : 'members' , component :MemberListComponent},
      {path : 'lists' , component :ListsComponent},
      {path : 'messages' , component :MessagesComponent},
    ]
  }, 
  {path : 'errors', component : TestErrorsComponent},  
  {path : 'not-found', component : NotFoundComponent},
  {path : 'server-error', component : ServerErrorComponent},
  {path : '**' , component :HomeComponent , pathMatch : 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
