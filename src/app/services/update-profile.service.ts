import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UpdateProfile } from '../models/update-profile';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  baseUrl = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  updateProfile(postdata: UpdateProfile, httpOptions) {
    return this.http.post(this.baseUrl + "user/updateProfile", postdata, httpOptions).toPromise().catch(this.handleError);
  }

  // For error handler
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.error || error);
  }
}
