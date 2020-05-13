import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GenerateEvent } from '../models/generate-event';

@Injectable({
  providedIn: 'root'
})
export class GenerateEventService {

  baseUrl = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  generateEvent(postdata: GenerateEvent, httpOptions) {
    return this.http.post(this.baseUrl + "event/createEvent", postdata, httpOptions).toPromise().catch(this.handleError);
  }

  // For error handler
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.error || error);
  }
}
