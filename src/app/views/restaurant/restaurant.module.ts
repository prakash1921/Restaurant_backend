import { BrowserModule } from '@angular/platform-browser';

import { RestaurantRoutingModule } from '../restaurant/restaurant-routing.module';
import { RestaurantComponent } from '../restaurant/restaurant.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgmCoreModule } from '@agm/core';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RatingModule } from 'ngx-rating';
// import { NgbdRatingBasic } from './rating-basic';
@NgModule({
  
  imports: [
    RestaurantRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule ,
    RatingModule,
    // NgbdRatingBasic,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDGmgR89gkZ0WP9vMFJ-k9MCvGsC4Wo5Ps'
    })
  ],
  declarations: [
    RestaurantComponent,
    AddRestaurantComponent,
    EditRestaurantComponent
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ],
})
export class RestaurantModule { }
