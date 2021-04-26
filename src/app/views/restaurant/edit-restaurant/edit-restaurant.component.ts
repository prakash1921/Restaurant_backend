import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient } from '@angular/common/http';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { MouseEvent } from '@agm/core';

import * as _ from 'lodash'

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {
  myForm: any = [];
  id: any;
  response: any = [];

  duplicatedata: boolean = false;
  zoom: number = 8;
  // lat: number = 19.019552;
  // lng: number = 72.8382497;
  lat: number ;
  lng: number ;
  markers: marker[] = [];
  currentRate: Number = 2;
  menunameflag: boolean = false;
  costflag: boolean = false;
  menuList: any = [];
  newresponse:any = [];
  constructor(private activatedRoute: ActivatedRoute, public service: RestaurantService, public route: Router, public fb: FormBuilder, public http: HttpClient, public toastr: ToastrManager) {
    this.id = this.activatedRoute.snapshot.params.id;

  }
  ngOnInit() {
    this.myForm = this.fb.group({
      'Rid': new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]),
      'password': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'locationName': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z]*$')]),
      'address': new FormControl('', Validators.required),
      'zip': new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]),
      'cuisines': new FormControl('', Validators.required),
      'rating': new FormControl(''),
      "menuname": new FormControl(''),
      'cost': new FormControl(''),
    })
    this.getDatabyid(this.id)
  }
  getDatabyid(id) {
    this.service.getDatabyResturantid(id).subscribe(data => {
      if (data) {
        console.log('aaaaaaaaaaaaa', data.data[0])
        this.response = data;
        console.log('this.response', this.response)
        this.myForm.patchValue({
          'Rid': this.response.data[0].Rid,
          'password': this.response.data[0].password,
          'name': this.response.data[0].name,
          'locationName': this.response.data[0].locationName,
          'address': this.response.data[0].address,
          'zip': this.response.data[0].zip,
          'cuisines': this.response.data[0].cuisines,
          'rating': this.response.data[0].rating,

        })
        this.menuList = this.response.data[0].menuList;
        this.lat = this.response.data[0].location.coordinates[0];
        this.lng = this.response.data[0].location.coordinates[1];
        console.log('hhh',this.response.data[0].location.coordinates)
        this.markers = [{
          lat: this.response.data[0].location.coordinates[0],
          lng: this.response.data[0].location.coordinates[1],
          draggable: true
        }];
        // this.markers={
        //   type:'Point',
        //   coordinates:[this.markers[0].lng,this.markers[0].lat],
        // },

        // this.response.data[0].location.
      } else {
        console.log('error')
      }

    });
  }

  changevalue() {
    this.duplicatedata = false
  }
  unique() {

    var body = this.myForm.value.Rid;
    this.service.uniquecheck(body).subscribe(data => {
      if (data) {
        console.log('dadadaa', data);
        if (data.data.length != 0) {
          this.duplicatedata = true
        }
        // this.toastr.successToastr('Restaurant Add Successfully.', 'Success!');

        // this.route.navigateByUrl('restaurant')

      } else {
        console.log('error')
      }

    });


  }

  onUpdate() {
    console.log(this.myForm.value);
    if (this.markers.length != 0) {
      if (this.menuList.length != 0) {
      // var body = {
      //   id: this.id,
      //   data: this.myForm.value
      // }
      var body = {
        data: this.myForm.value,
        id: this.id,
        // Rid:this.myForm.value.Rid,
        // password:this.myForm.value.password,
        // name:this.myForm.value.name,
        // locationName:this.myForm.value.locationName,
        // address:this.myForm.value.address,
        // zip:this.myForm.value.zip,
        // cuisines:this.myForm.value.cuisines,
        location: {
          type: 'Point',
          coordinates: [this.markers[0].lng, this.markers[0].lat],
        },
        menuList:this.menuList
      };


      this.service.updateResturant(body).subscribe(data => {
        if (data) {
          this.toastr.successToastr('Restaurant Updated Successfully.', 'Success!');

          this.route.navigateByUrl('restaurant')

        } else {
          console.log('error')
        }

      });
    }else{
      this.toastr.errorToastr('Atlest One Menu need to Add ', 'Oops!')

    }
  }
     else {
      this.toastr.errorToastr('Select location from google map', 'Oops!');
    }
  }
  get f() { return this.myForm.controls; }
  mapClicked($event: MouseEvent) {

    console.log('fff', $event)
    this.markers = [{
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    }];
  }


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
    this.markers = [{
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    }];
  }



  Add() {


    if (this.myForm.value.menuname != '') {
      this.menunameflag = false;
    }
    else {
      this.menunameflag = true;
    }

    if (this.myForm.value.cost != '') {
      this.costflag = false;
    }
    else {
      this.costflag = true;
    }
    if (this.myForm.value.menuname != '' && this.myForm.value.cost != '') {
      var newObject = {
        menuname: this.myForm.value.menuname,
        cost: this.myForm.value.cost
      }
      if (this.menuList.length == 0) {
        this.menuList.push(newObject);
        this.myForm.patchValue({
          'menuname': '',
          'cost': ''
        })
      } else {
        var data = _.find(this.menuList, function (o) { return o.menuname == newObject.menuname });
        if (data) {
          // this.costflag=false;

          this.toastr.errorToastr('MenuName Already Exist', 'Oops!');
          return
        } else {
          this.menuList.push(newObject);
          this.myForm.patchValue({
            'menuname': '',
            'cost': ''
          })
        }
      }
    }

    console.log('aaa', this.myForm.value);

  }

  delete(_id) {
    console.log('fff', _id)
    this.service.deletemenu(this.id, _id).subscribe(data => {
      if (data) {
        console.log('data deleted',data)
        this.service.getDatabyResturantid(this.id).subscribe(data => {
          if (data) {
            this.newresponse=data
            this.menuList = this.newresponse.data[0].menuList;
            console.log('jjj',this.newresponse)
          }
        })
      }
    })
  }


  remove(item) {
    console.log('menuname', item)
    for (var i = 0; i < this.menuList.length; i++) {
      if (this.menuList[i].menuname == item) {
        this.menuList.splice(i, 1);
        console.log('fff', this.menuList)

      }
    }
    console.log('fff', this.menuList)
  }
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}