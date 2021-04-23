import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RestaurantRoutingModule } from '../restaurant/restaurant-routing.module';
import { RestaurantComponent } from '../restaurant/restaurant.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  
  imports: [
    RestaurantRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule ,
  ],
  declarations: [
    RestaurantComponent,
    AddRestaurantComponent,
    EditRestaurantComponent
    
  ],
})
export class RestaurantModule { }
