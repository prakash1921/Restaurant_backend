import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { RestaurantComponent } from './views/restaurant/restaurant.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'restaurant',
    pathMatch:'full'
  },
  
  {
    path:'restaurant',
    loadChildren:'./views/restaurant/restaurant.module#RestaurantModule'
  },

  {
    path:'**',
    component:PageNotFoundComponent,
    data:{
      title:'Page not found '
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
