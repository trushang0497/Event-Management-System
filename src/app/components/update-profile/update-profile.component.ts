import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdateProfileService } from 'src/app/services/update-profile.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  updateProfileForm: FormGroup;
  submitted: boolean = false;
  rooms: any;
  errorMsg: any;
  errFlag: any
  tokenValue: any;
  token: string;
  httpOptions: { headers: any; };

  constructor(fb: FormBuilder, private updateProfileService: UpdateProfileService, private router: Router) {
    this.updateProfileForm = fb.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      gender: ["", Validators.required],
      date_of_birth: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + this.token
      })
    }
  }

  SubmitData() {
    this.submitted = true;

    if (this.updateProfileForm.controls.first_name.value != "" && this.updateProfileForm.controls.first_name.value != undefined &&
      this.updateProfileForm.controls.last_name.value != "" && this.updateProfileForm.controls.last_name.value != undefined &&
      this.updateProfileForm.controls.gender.value != "" && this.updateProfileForm.controls.gender.value != undefined &&
      this.updateProfileForm.controls.date_of_birth.value != "" && this.updateProfileForm.controls.date_of_birth.value != undefined) {

      var updateProfileData = {
        first_name: this.updateProfileForm.controls.first_name.value,
        last_name: this.updateProfileForm.controls.last_name.value,
        gender: this.updateProfileForm.controls.gender.value,
        date_of_birth: this.updateProfileForm.controls.date_of_birth.value
      }

      this.updateProfileService.updateProfile(updateProfileData, this.httpOptions).then(res => {
        if (res.code == 200 || res.code == "200") {
          this.rooms = res.data;
          this.router.navigate(['/dashboard'])
        }
        if (res.code == 500 || res.code == "500") {
          this.errFlag = true;
          this.errorMsg = res.data
        }
        if (res.code == 401 || res.code == "401") {
          this.errFlag = true;
          this.errorMsg = res.data
        }
      })
    } else {
      this.errorMsg = "Form Values are not valid"
    }
  }
}
