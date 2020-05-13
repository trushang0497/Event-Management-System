import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { EventManagementService } from 'src/app/services/event-management.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  columnDefine: any;
  token: string;
  httpOptions: any;
  errFlag: boolean = false;
  errorMsg: any;
  gridAPI: any;
  columnAPI: any;
  rowData: any[];
  eventList: any;

  constructor(private eventManagementService: EventManagementService) {
    this.columnDefine = [
      {
        headerName: "Title",
        field: "title",
        width: 200,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Description",
        field: "description",
        width: 200,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Date",
        field: "date",
        width: 200,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Place",
        field: "place",
        width: 200,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Maximum Count",
        field: "max_count",
        width: 200,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Paticipants",
        field: "paticipants",
        width: 200,
        sortingOrder: ["asc", "desc"]
      }
    ];
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + this.token
      })
    }
    this.getEventList()
  }

  getEventList() {
    this.eventManagementService.eventList(this.httpOptions).then(res => {
      if (res.code == 200 || res.code == "200") {
        this.eventList = res.data
      }
      if (res.code == 500 || res.code == "500") {
        this.errFlag = true;
        this.errorMsg = res.data
      }
    })
  }

  onGridReady(params) {
    setTimeout(() => {
      this.gridAPI = params.api;
      this.columnAPI = params.columnApi;
      if (this.eventList != undefined) {
        let dataValue = this.eventList    // array of the list
        this.gridAPI.setRowData(dataValue)
      } else {
        return
      }
    }, 3000);
  }
}