import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient } from '@angular/common/http';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { MouseEvent } from '@agm/core';
import * as _ from 'lodash'
@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  myForm: any = [];
  duplicatedata: boolean = false;
  zoom: number = 8;
  // zoomPosition: google.maps.ControlPosition = google.maps.ControlPosition.TOP_RIGHT;
  // initial center position for the map
  lat: number = 19.019552;
  lng: number = 72.8382497;
  markers: marker[] = [];
  menunameflag: boolean = false;
  costflag: boolean = false;
  menuList: any = [];
  constructor(public service: RestaurantService, public route: Router, public fb: FormBuilder, public http: HttpClient, public toastr: ToastrManager) {

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
    this.myForm.patchValue({
      'rating': 1
    })

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

      } else {
        console.log('error')
      }

    });


  }

  get f() { return this.myForm.controls; }


  onSubmit() {


    if (this.duplicatedata == false) {

      if (this.markers.length != 0) {
        if (this.menuList.length != 0) {
          var body = {
            Rid: this.myForm.value.Rid,
            password: this.myForm.value.password,
            name: this.myForm.value.name,
            locationName: this.myForm.value.locationName,
            address: this.myForm.value.address,
            zip: this.myForm.value.zip,
            rating: this.myForm.value.rating,
            cuisines: this.myForm.value.cuisines,
            location: {
              type: 'Point',
              coordinates: [this.markers[0].lng, this.markers[0].lat],
            },
            menuList: this.menuList
          };
          this.service.addResturant(body).subscribe(data => {
            if (data) {
              setTimeout(() => {
                this.route.navigateByUrl('restaurant')

              }, 1000)

              this.toastr.successToastr('Restaurant Add Successfully.', 'Success!');


            } else {
              console.log('error')
            }

          });

        } else {
          this.toastr.errorToastr('Atlest One Menu need to Add ', 'Oops!')
        }
      } else {
        this.toastr.errorToastr('Select location from google map', 'Oops!');
      }
    } else {
      this.toastr.errorToastr('ID already Exist', 'Oops!');
    }

  }

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

  // validate(){
  //   if(this.duplicatedata==false){
  //     return  setTimeout(() => {
  //       // this.route.navigateByUrl('restaurant')
  //       this.toastr.errorToastr('ID already Exist','Oops!');

  //       }, 1000)
  //   }

  // }
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


  delete(item) {
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
