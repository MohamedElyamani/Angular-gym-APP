import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIsService {
  baseURL: string = 'http://localhost:3000/query';
 // baseURL: string = 'https://simple-crud-project.vercel.app/';
  constructor(private HTTP: HttpClient) {}
  //this method is for add new user
  addRecoed(userObj: User): Observable<any> {
    return this.HTTP.post(`${this.baseURL}`, userObj);
  }

  // this method is for get all users
  getRecords(): Observable<any> {
    return this.HTTP.get(`${this.baseURL}`);
  }

  //this method is for update user
  updateRecord(userObj: User, id: number): Observable<any> {
    return this.HTTP.put(`${this.baseURL}/${id}`, userObj);
  }

  //this method is for delete user
  deleteRecord(id: number): Observable<any> {
    return this.HTTP.delete(`${this.baseURL}/${id}`);
  }

  //this method is for get user details
  detailsRecord(id: number): Observable<any> {
    return this.HTTP.get(`${this.baseURL}/${id}`);
  }
}
