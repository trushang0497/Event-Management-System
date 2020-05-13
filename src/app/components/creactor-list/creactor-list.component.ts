import { Component, OnInit } from '@angular/core';
import { CreatorListService } from 'src/app/services/creator-list.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-creactor-list',
  templateUrl: './creactor-list.component.html',
  styleUrls: ['./creactor-list.component.css']
})
export class CreactorListComponent implements OnInit {

  columnDefine: any;
  token: string;
  httpOptions: any;
  errFlag: boolean = false;
  errorMsg: any;
  gridAPI: any;
  columnAPI: any;
  rowData: any[];
  creatorList: any;

  constructor(private creatorListService: CreatorListService) {
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
      },
      {
        headerName: "First Name",
        field: "first_name",
        width: 200,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Last Name",
        field: "last_name",
        width: 200,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Email Address",
        field: "email_address",
        width: 200,
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Contact Number",
        field: "contact_number",
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
    this.getCreatorList()
  }

  getCreatorList() {
    this.creatorListService.creatorList(this.httpOptions).then(res => {
      if (res.code == 200 || res.code == "200") {
        this.creatorList = res.data
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
      if (this.creatorList != undefined) {
        let dataValue = this.creatorList    // array of the list
        this.gridAPI.setRowData(dataValue)
      } else {
        return
      }
    }, 3000);
  }
}
