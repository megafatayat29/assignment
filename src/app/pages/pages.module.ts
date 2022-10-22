import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    PagesComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PagesModule { }
