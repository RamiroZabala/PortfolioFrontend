import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap} from 'rxjs';
import { Education } from '../models/models';
import { ApiServerUrl } from '../config/config-data';

@Injectable({
  providedIn: 'root'
})
export class EducationDataService {
  private _refresh$ = new Subject<void>();

  get refresh$(){
    return this._refresh$;
  }
  
  constructor(private httpC:HttpClient) { }

  getEducationData():Observable<any>{
    return this.httpC.get<Education>(ApiServerUrl.API_SERVER_GET+"education")
      .pipe(tap(data => console.log('Education -> GET -> OK', data)))
  }
  deleteEducation(id:number):Observable<any>{
    return this.httpC.delete(ApiServerUrl.API_SERVER_DELETE+"education/"+id)
     .pipe(tap(data => console.log('Education -> DELETE -> OK', data)))
  }
  addEducation(body:Education):Observable<any>{
    return this.httpC.post(ApiServerUrl.API_SERVER_NEW+"education", body)
    .pipe(
      tap(() => {
        this._refresh$.next();
        console.log('Education -> POST -> OK', body);
      })
    )
  }
}
