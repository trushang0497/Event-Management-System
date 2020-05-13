import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventManagementService } from 'src/app/services/event-management.service';

@Component({
  selector: 'app-join-event',
  templateUrl: './join-event.component.html',
  styleUrls: ['./join-event.component.css']
})
export class JoinEventComponent implements OnInit {

  joinEventForm: FormGroup
  submitted: boolean = false;
  rooms: any;
  errorMsg: any;
  errFlag: any
  tokenValue: any;
  token: string;
  httpOptions: { headers: any; };
  eventList: any;

  constructor(fb: FormBuilder, private eventManagementService: EventManagementService, private router: Router) {
    this.joinEventForm = fb.group({
      event: ["", Validators.required],
      join_date: ["", Validators.required]
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
    this.getEventList();
  }

  SubmitData() {
    this.submitted = true;

    if (this.joinEventForm.controls.event.value != "" && this.joinEventForm.controls.event.value != undefined &&
      this.joinEventForm.controls.join_date.value != "" && this.joinEventForm.controls.join_date.value != undefined) {

      var joinEventData = {
        event_id: this.joinEventForm.controls.event.value,
        join_date: this.joinEventForm.controls.join_date.value
      }

      this.eventManagementService.joinEvent(joinEventData, this.httpOptions).then(res => {
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

  leaveEvent() {
    this.submitted = true;

    if (this.joinEventForm.controls.event.value != "" && this.joinEventForm.controls.event.value != undefined &&
      this.joinEventForm.controls.join_date.value != "" && this.joinEventForm.controls.join_date.value != undefined) {

      var leaveEventData = {
        event_id: this.joinEventForm.controls.event.value
      }

      this.eventManagementService.leaveEvent(leaveEventData, this.httpOptions).then(res => {
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

  getEventList() {
    this.eventManagementService.eventList(this.httpOptions).then(res => {
      if (res.code == 200 || res.code == "200") {
        this.eventList = res.data;
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
  }
}