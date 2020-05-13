import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ParticipantListService } from 'src/app/services/participant-list.service';

@Component({
  selector: 'app-participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.css']
})
export class ParticipantsListComponent implements OnInit {

  columnDefine: any;
  token: string;
  httpOptions: any;
  errFlag: boolean = false;
  errorMsg: any;
  gridAPI: any;
  columnAPI: any;
  rowData: any[];
  participantList: any;

  constructor(private participantListService: ParticipantListService) {
    this.columnDefine = [
      {
        headerName: "Join Or Leave Status",
        field: "join_leave_flag",
        width: 150,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "join Date",
        field: "join_date",
        width: 150,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Updated Date",
        field: "updated_date",
        width: 150,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Title",
        field: "title",
        width: 150,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Description",
        field: "description",
        width: 150,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Date",
        field: "date",
        width: 150,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Place",
        field: "place",
        width: 150,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Paticipants",
        field: "max_count",
        width: 150,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "First Name",
        field: "first_name",
        width: 150,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Last Name",
        field: "last_name",
        width: 150,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Email Address",
        field: "email_address",
        width: 150,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Contact Number",
        field: "contact_number",
        width: 150,
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
    this.getParticipantsList();
  }

  getParticipantsList() {
    this.participantListService.participantList(this.httpOptions).then(res => {
      if (res.code == 200 || res.code == "200") {
        this.participantList = res.data
      }
      if (res.code == 500 || res.code == "500") {
        this.errFlag = true;
        this.errorMsg = res.data
      }
    })
  }

  onGridReady(params) {
    setTimeout(() => {
      // console.log("Hello from setTimeout");
      this.gridAPI = params.api;
      this.columnAPI = params.columnApi;
      if (this.participantList != undefined) {
        let dataValue = this.participantList    // array of the list
        this.gridAPI.setRowData(dataValue)
      } else {
        return
      }
    }, 3000);
  }
}