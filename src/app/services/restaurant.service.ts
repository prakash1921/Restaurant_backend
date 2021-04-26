import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import * as Rx from 'rxjs/Rx'
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  url: any = 'http://localhost:8100/';
  constructor(public http: HttpClient) { }

  //get List by  LocationName 
  getListbyname(locationName,rt,menuname) {
    return this.http.get(this.url + 'restaurant/List?locationName=' + locationName+'&rt='+rt+'&menuname='+menuname)
  }
  getListbylatlng(locationName,lat,lng,rt,menuname) {
    return this.http.get(this.url + 'restaurant/List?locationName=' + locationName+'&lat='+lat+'&lng='+lng+'&rt='+rt+'&menuname='+menuname)
  }
  
  //get List of restaurant 
  getAllLocation() {
    return this.http.get(this.url + 'restaurant/getAllLocation')

  }
  //get List of restaurant  by pagination
  // getpaginatedata(page, size, location) {
  //   return this.http.get<any>(this.url + 'restaurant/pagination?pageNo=' + page + '&size=' + size + '&location=' + location)
  // }

  getlocationbycoodinates(lat,lng,locationName,rt,menuname){
    if(menuname==''){
      return this.http.get<any>(this.url + 'restaurant/getratbylatlng'+'/'+rt+'/'+undefined+'/'+lat+'/' +lng +'/'+locationName)

    }else{
      return this.http.get<any>(this.url + 'restaurant/getlocationbycoodinates/'+lat+'/' +lng +'/'+locationName+'/'+rt+'/'+menuname)

    }
  }
  //Add resturant 
  addResturant(body) {
    return this.http.post<any>(this.url + 'restaurant/add', body)
  }
  //get resturant  by resaturant id 
  //to bind data in edit-resturant component
  getDatabyResturantid(id) {
    return this.http.get<any>(this.url + 'restaurant/getbyid/' + id)

  }
  //Update resturant  data 
  updateResturant(body) {
    return this.http.post<any>(this.url + 'restaurant/update', body)

  }
  //delete resturant  data by resaturant id
  deleteRestaurant(id) {
    return this.http.get<any>(this.url + 'restaurant/delete?id=' + id)

  }
  //Check duplicate data
  uniquecheck(id) {
    return this.http.get<any>(this.url + 'restaurant/uniquecheck?id=' + id)

  }
  deletemenu(id,_id){
    return this.http.get<any>(this.url + 'restaurant/deletemenu?id=' + id+'&nid='+_id)
 
  }


  getratbylatlng(rt,locationName,lat,lng,menuname){
    if(menuname==''){
      return this.http.get<any>(this.url + 'restaurant/getratbylatlng'+'/'+rt+'/'+undefined+'/'+lat+'/' +lng +'/'+locationName)

    }else{
      return this.http.get<any>(this.url + 'restaurant/getratbylatlng'+'/'+rt+'/'+menuname+'/'+lat+'/' +lng +'/'+locationName)

    }
  }
  // getratbylocationname(rt,locationName){
  //   return this.http.get<any>(this.url + 'restaurant/getratorbylocationname?id='+rt+'&locationName='+locationName)
  // }
  
}
