import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { PagesComponent } from './pages.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
    	{ path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: HomeComponent },
      { path: 'user', component: UserComponent }
    ]
  }  
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    HttpModule 
  ],
  declarations: [HomeComponent, UserComponent, PagesComponent]
})


export class PagesModule { }
