import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, tap} from 'rxjs';
import { Person } from '../models/models';
import { ApiServerUrl } from '../config/config-data';

@Injectable({
  providedIn: 'root'
})
export class PersonDataService {

  private _refresh$ = new Subject<void>();

  constructor(private httpC:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getData():Observable<any>{
    //return this.httpC.get('./assets/data/about.json');
    return this.httpC.get<Person>(ApiServerUrl.API_SERVER_GET+"person")
      .pipe(tap(data => console.log('Person -> GET -> OK', data)))
  };
  addPerson(body:Person):Observable<any>{
    return this.httpC.post(ApiServerUrl.API_SERVER_NEW+"person", body)
      .pipe(
        tap(() => {
          this._refresh$.next();
          console.log('Person -> POST -> OK', body);
        })
      )
  }
}
