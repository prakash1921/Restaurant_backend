import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  List: any = [];
  size: any = 10;
  p: any = 1;
  config: any;
  search: FormGroup
  locationdata: any=[];
  constructor(public service: RestaurantService, public route: Router, public toastr: ToastrManager, public fb: FormBuilder) {
  }

  ngOnInit() {
    this.search = this.fb.group({
      location: ['ALL']
    })

    this.getList();
    this.getAllLocation()
  }

  getList() {
    this.p=1;
    this.service.getList(this.search.value.location).subscribe(data => {
      this.List = data;
      console.log(this.List.data);

    });
  }
  getAllLocation(){
    this.service.getAllLocation().subscribe(data => {
      this.locationdata = data;
      console.log( this.locationdata.data);

    });
  }
  detailsPage(id) {
    this.route.navigateByUrl('restaurant/edit/' + id)

  }
  delete(id) {
    this.service.deleteRestaurant(id).subscribe(data => {
      if (data) {
        this.toastr.successToastr('Restaurant Deleted Successfully.', 'Success!');

        this.getList();
      } else {
        console.log('ddddddddddddddd')
      }


    });
  }

  paginate(event) {
    this.p = event;
    console.log('ttt',this.p)
   
      this.service.getpaginatedata(event, this.size,this.search.value.location).subscribe(data => {
        this.List = data;
        console.log(this.List);
      });
    
  }


  getdatabylocation(e) {
    console.log('eeeee', e)
  }

  add() {
    this.route.navigateByUrl('restaurant/add')
  }
}
