import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenerateEventService } from 'src/app/services/generate-event.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-generate-event',
  templateUrl: './generate-event.component.html',
  styleUrls: ['./generate-event.component.css']
})
export class GenerateEventComponent implements OnInit {

  createEventForm: FormGroup;
  submitted: boolean = false;
  rooms: any;
  errorMsg: any;
  errFlag: any
  tokenValue: any;
  token: string;
  httpOptions: { headers: any; };

  constructor(fb: FormBuilder, private generateEventService: GenerateEventService, private router: Router) {
    this.createEventForm = fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      place: ["", Validators.required],
      max_count: ["", Validators.required, Validators.minLength(5)],
      date: ["", Validators.required, Validators.minLength(10), Validators.maxLength(10)],
      paticipants: ["", Validators.required]
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

    if (this.createEventForm.controls.title.value != "" && this.createEventForm.controls.title.value != undefined &&
      this.createEventForm.controls.description.value != "" && this.createEventForm.controls.description.value != undefined &&
      this.createEventForm.controls.place.value != "" && this.createEventForm.controls.place.value != undefined &&
      this.createEventForm.controls.max_count.value != "" && this.createEventForm.controls.max_count.value != undefined &&
      this.createEventForm.controls.date.value != "" && this.createEventForm.controls.date.value != undefined &&
      this.createEventForm.controls.paticipants.value != "" && this.createEventForm.controls.paticipants.value != undefined) {

      var createEventData = {
        title: this.createEventForm.controls.title.value,
        description: this.createEventForm.controls.description.value,
        place: this.createEventForm.controls.place.value,
        max_count: this.createEventForm.controls.max_count.value,
        date: this.createEventForm.controls.date.value,
        paticipants: this.createEventForm.controls.paticipants.value
      }

      this.generateEventService.generateEvent(createEventData, this.httpOptions).then(res => {
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
