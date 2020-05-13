import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EventManagement } from '../models/event-management';

@Injectable({
  providedIn: 'root'
})
export class EventManagementService {

  baseUrl = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  eventList(httpOptions) {
    return this.http.get(this.baseUrl + "event/eventList", httpOptions).toPromise().catch(this.handleError);
  }

  joinEvent(postdata: EventManagement, httpOptions) {
    return this.http.post(this.baseUrl + "participant/joinEvent", postdata, httpOptions).toPromise().catch(this.handleError);
  }

  leaveEvent(postdata: EventManagement, httpOptions) {
    return this.http.post(this.baseUrl + "participant/leaveEvent", postdata, httpOptions).toPromise().catch(this.handleError);
  }

  // For error handler
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.error || error);
  }
}
