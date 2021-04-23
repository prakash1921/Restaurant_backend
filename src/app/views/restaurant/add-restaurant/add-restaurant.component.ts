import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient } from '@angular/common/http';
import { RestaurantService } from 'src/app/services/restaurant.service';
@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  myForm: any = [];
  duplicatedata: boolean = false;
  constructor(public service: RestaurantService, public route: Router, public fb: FormBuilder, public http: HttpClient, public toastr: ToastrManager) {

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      'Rid': new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]),
      'password': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'location': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z]*$')]),
      'address': new FormControl('', Validators.required),
      'zip': new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]),
      'cuisines': new FormControl('', Validators.required)
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
    var body = this.myForm.value;
    if(this.duplicatedata==false){
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
    }else{
      this.toastr.errorToastr('ID already Exist','Oops!');
    }
    
  }


  // validate(){
  //   if(this.duplicatedata==false){
  //     return  setTimeout(() => {
  //       // this.route.navigateByUrl('restaurant')
  //       this.toastr.errorToastr('ID already Exist','Oops!');

  //       }, 1000)
  //   }

  // }
}
