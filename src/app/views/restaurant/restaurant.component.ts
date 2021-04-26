import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { MouseEvent } from '@agm/core';
// import  {} from '@agm/core'
// import { google} from 'googlemaps';
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
  title = 'newFrontend';
  zoom: number = 8;
  // zoomPosition: google.maps.ControlPosition = google.maps.ControlPosition.TOP_RIGHT;
  // initial center position for the map
  lat: number = 19.019552;
  lng: number = 72.8382497;
  
  markers: marker[] = []
	
  constructor(public service: RestaurantService, public route: Router, public toastr: ToastrManager, public fb: FormBuilder) {
    // this.markers = [{
    //   lat: ,
    //   lng: this.response.data[0].location.coordinates[1],
    //   draggable: true
    // }];}
  }

  ngOnInit() {
    this.search = this.fb.group({
      location: ['ALL'],
      rating:['ALL'],
      menuname:''
    })

    this.getList();
    this.getAllLocation()
  }


  getList() {
    this.p=1;
    if(this.markers.length!=0){
      this.service.getListbylatlng(this.search.value.location,this.markers[0].lat,this.markers[0].lng,this.search.value.rating,this.search.value.menuname).subscribe(data => {
        this.List = data;
        console.log(this.List.data);
  
      });
    }else{
      var lat;
      var lng;
      this.service.getListbyname(this.search.value.location,this.search.value.rating,this.search.value.menuname).subscribe(data => {
        this.List = data;
        console.log(this.List.data);
  
      });
    }
    
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

  // paginate(event) {
  //   this.p = event;
  //   console.log('ttt',this.p)
   
  //     this.service.getpaginatedata(event, this.size,this.search.value.location).subscribe(data => {
  //       this.List = data;
  //       console.log(this.List);
  //     });
    
  // }


  getdatabylocation(e) {
    console.log('eeeee', e)
  }

  add() {
    this.route.navigateByUrl('restaurant/add')
  }

  mapClicked($event: MouseEvent) {
    console.log('fff',$event)
    this.markers=[{
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    }];
    this.service.getlocationbycoodinates($event.coords.lat,$event.coords.lng,this.search.value.location,this.search.value.rating,this.search.value.menuname).subscribe(data => {
      this.List = data;
      console.log("ssss",this.List);
    });
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
    this.service.getlocationbycoodinates($event.coords.lat,$event.coords.lng,this.search.value.location,this.search.value.rating,this.search.value.menuname).subscribe(data => {
      this.List = data;
      console.log("ssss",this.List);
    });
  }



  getrate(){
    if(this.markers.length!=0){
      this.service.getratbylatlng(this.search.value.rating,this.search.value.location,this.markers[0].lat,this.markers[0].lng,this.search.value.menuname).subscribe(data => {
        this.List = data;
        console.log(this.List.data);
  
      });
    }
    else {
     
      this.service.getListbyname(this.search.value.location,this.search.value.rating,this.search.value.menuname).subscribe(data => {
        this.List = data;
        console.log(this.List.data);
  
      });
    }
  }




  getcost(menuname){

    if(this.markers.length!=0){
      this.service.getratbylatlng(this.search.value.rating,this.search.value.location,this.markers[0].lat,this.markers[0].lng,this.search.value.menuname).subscribe(data => {
        this.List = data;
        console.log(this.List.data);
  
      });
    }
    else {
     
      this.service.getListbyname(this.search.value.location,this.search.value.rating,this.search.value.menuname).subscribe(data => {
        this.List = data;
        console.log(this.List.data);
  
      });
    }
   
    // console.log('menuname',menuname)
  }


  onMapReady(map) {
    // google.maps.ControlPosition = google.maps.ControlPosition.TOP_RIGHT;
    // this.zoomPosition = google.maps.ControlPosition;
    // }
    map.setOptions({
      zoomControl: 'true',
      zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
      }
      });
    }
    
}
// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
