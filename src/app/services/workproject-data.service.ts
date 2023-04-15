import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap} from 'rxjs';
import { WorkProject } from '../models/models';
import { ApiServerUrl } from '../config/config-data';

@Injectable({
  providedIn: 'root'
})
export class WorkProjectDataService {

  private _refresh$ = new Subject<void>();

  get refresh$(){
    return this._refresh$;
  }
  

  private httpHeaderOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD'
    })
  };

  constructor(private httpC:HttpClient) { }

  // GETTERS ===========================================================================
  getWorkProjectData():Observable<any>{
    return this.httpC.get<WorkProject>(ApiServerUrl.API_SERVER_GET+"workprojects")
      .pipe(tap(data => console.log('WorkProjects -> GET -> OK', data)))
  }
  deleteWorkProject(id:number):Observable<any>{
    return this.httpC.delete(ApiServerUrl.API_SERVER_DELETE+"workproject/"+id)
      .pipe(tap(data => console.log('WorkProjects -> DELETE -> OK', data)))
  }
  addWorkProject(body:WorkProject):Observable<any>{
    return this.httpC.post(ApiServerUrl.API_SERVER_NEW+"workproject", body)
    .pipe(
      tap(() => {
        this._refresh$.next();
        console.log('WorkProjects -> POST -> OK', body);
      })
    )
  }
}
