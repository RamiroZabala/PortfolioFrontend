import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Person } from '../models/models';
import { ApiServerUrl } from '../config/config-data';

@Injectable({
  providedIn: 'root'
})
export class PersonDataService {

  constructor(private httpC:HttpClient) { }

  getData():Observable<any>{
    //return this.httpC.get('./assets/data/about.json');
    return this.httpC.get<Person>(ApiServerUrl.API_SERVER_GET+"person");
  };
  addPerson(body:Person):Observable<any>{
    return this.httpC.post(ApiServerUrl.API_SERVER_NEW+"person", body);
  }
}
