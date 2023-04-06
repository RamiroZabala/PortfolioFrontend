import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { WorkProject } from '../models/models';
import { ApiServerUrl } from '../config/config-data';

@Injectable({
  providedIn: 'root'
})
export class WorkProjectDataService {

  private httpHeaderOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD'
    })
  };

  constructor(private httpC:HttpClient) { }

  // GETTERS ===========================================================================
  getWorkProjectData():Observable<any>{
    return this.httpC.get<WorkProject>(ApiServerUrl.API_SERVER_GET+"workprojects");
  }
  deleteWorkProject(id:number):Observable<any>{
    return this.httpC.delete(ApiServerUrl.API_SERVER_DELETE+"workproject/"+id);
  }
  addWorkProject(body:WorkProject):Observable<any>{
    return this.httpC.post(ApiServerUrl.API_SERVER_NEW+"workproject", body);
  }
}
