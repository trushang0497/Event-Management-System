import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, ValidationErrors, FormBuilder } from 'node_modules/@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  rooms: any;
  errorMsg: any;
  errFlag: any
  tokenValue: any;

  constructor(fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = fb.group({
      email_address: ["", Validators.required],
      password: ["", Validators.required, Validators.minLength(5)]
    });
  }

  ngOnInit(): void {
    var token = localStorage.getItem('token')
    if (token) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  SubmitData() {
    this.submitted = true;
    if (this.loginForm.controls.email_address.value != "" && this.loginForm.controls.email_address.value != undefined && this.loginForm.controls.password.value != "" && this.loginForm.controls.password.value != undefined) {

      var loginData = { email_address: this.loginForm.controls.email_address.value, password: this.loginForm.controls.password.value }

      this.loginService.login(loginData).then(res => {
        if (res.code == 200 || res.code == "200") {
          this.rooms = res.data;
          this.tokenValue = this.rooms.token
          localStorage.setItem('token', this.tokenValue)
          this.router.navigate(['/dashboard'])
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
