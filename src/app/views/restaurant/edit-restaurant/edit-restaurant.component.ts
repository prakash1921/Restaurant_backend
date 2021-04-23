import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient } from '@angular/common/http';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private activatedRoute: ActivatedRoute, public service: RestaurantService, public route: Router, public fb: FormBuilder, public http: HttpClient, public toastr: ToastrManager) {
    this.id = this.activatedRoute.snapshot.params.id;

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
    this.getDatabyid(this.id)
  }
  getDatabyid(id) {
    this.service.getDatabyResturantid(id).subscribe(data => {
      if (data) {
        console.log('aaaaaaaaaaaaa', data.data[0])
        this.response = data;
        console.log('this.response', this.response)
        this.myForm.setValue({
          'Rid': this.response.data[0].Rid,
          'password': this.response.data[0].password,
          'name': this.response.data[0].name,
          'location': this.response.data[0].location,
          'address': this.response.data[0].address,
          'zip': this.response.data[0].zip,
          'cuisines': this.response.data[0].cuisines
        })
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
    
    var body = {
      id: this.id,
      data: this.myForm.value
    }

    this.service.updateResturant(body).subscribe(data => {
      if (data) {
        this.toastr.successToastr('Restaurant Updated Successfully.', 'Success!');

        this.route.navigateByUrl('restaurant')

      } else {
        console.log('error')
      }

    });
  }
  get f() { return this.myForm.controls; }


}
