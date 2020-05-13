import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, ValidationErrors, FormBuilder } from 'node_modules/@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;
  rooms: any;
  errorMsg: any;
  errFlag: any
  tokenValue: any;

  constructor(fb: FormBuilder, private registrationService: RegistrationService, private router: Router) {
    this.registerForm = fb.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email_address: ["", Validators.required],
      password: ["", Validators.required, Validators.minLength(5)],
      contact_number: ["", Validators.required, Validators.minLength(10), Validators.maxLength(10)],
      gender: ["", Validators.required],
      date_of_birth: ["", Validators.required],
    });
  }

  ngOnInit(): void {
  }

  SubmitData() {
    this.submitted = true;
    if (this.registerForm.controls.first_name.value != "" && this.registerForm.controls.first_name.value != undefined &&
      this.registerForm.controls.last_name.value != "" && this.registerForm.controls.last_name.value != undefined &&
      this.registerForm.controls.email_address.value != "" && this.registerForm.controls.email_address.value != undefined &&
      this.registerForm.controls.password.value != "" && this.registerForm.controls.password.value != undefined &&
      this.registerForm.controls.contact_number.value != "" && this.registerForm.controls.contact_number.value != undefined &&
      this.registerForm.controls.gender.value != "" && this.registerForm.controls.gender.value != undefined &&
      this.registerForm.controls.date_of_birth.value != "" && this.registerForm.controls.date_of_birth.value != undefined) {

      var registrationData = {
        first_name: this.registerForm.controls.first_name.value,
        last_name: this.registerForm.controls.last_name.value,
        email_address: this.registerForm.controls.email_address.value,
        password: this.registerForm.controls.password.value,
        contact_number: this.registerForm.controls.contact_number.value,
        gender: this.registerForm.controls.gender.value,
        date_of_birth: this.registerForm.controls.date_of_birth.value
      }

      this.registrationService.registration(registrationData).then(res => {
        if (res.code == 200 || res.code == "200") {
          this.rooms = res.data;
          this.router.navigate(['/login'])
        }
        if (res.code == 500 || res.code == "500") {
          this.errFlag = true;
          this.errorMsg = res.data
        }
      })
    } else {
      this.errorMsg = "Form Values are not valid"
    }
  }

}
