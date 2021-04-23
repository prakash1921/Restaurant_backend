import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { RestaurantComponent } from './restaurant.component';


const routes: Routes = [

  {
    path:'',
    component:RestaurantComponent,
    data:{
      title:'Restaurant'
    }
  },
  {
    path:'add',
    component:AddRestaurantComponent,
    data:{
      title:'AddRestaurant'
    }
  },
  {
    path:'edit/:id',
    component:EditRestaurantComponent,
    data:{
      title:'EditRestaurant'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
