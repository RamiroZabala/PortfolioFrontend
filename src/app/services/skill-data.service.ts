import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap} from 'rxjs';
import { Skill } from '../models/models';
import { ApiServerUrl } from '../config/config-data';

@Injectable({
  providedIn: 'root'
})
export class SkillDataService {
  private _refresh$ = new Subject<void>();

  get refresh$(){
    return this._refresh$;
  }
  
  constructor(private httpC:HttpClient) { }

  getHardSkillData():Observable<any>{
    return this.httpC.get<Skill>(ApiServerUrl.API_SERVER_GET+"hardskill")
      .pipe(tap(data => console.log('HardSkills -> GET -> OK', data)))
  };
  getSoftSkillData():Observable<any>{
    return this.httpC.get<Skill>(ApiServerUrl.API_SERVER_GET+"softskill")
      .pipe(tap(data => console.log('SoftSkills -> GET -> OK', data)))
  };

  deleteHardSkill(id:number):Observable<any>{
    return this.httpC.delete(ApiServerUrl.API_SERVER_DELETE+"hardskill/"+id)
      .pipe(tap(data => console.log('HardSkills -> DELETE -> OK', data)))
  }
  deleteSoftSkill(id:number):Observable<any>{
    return this.httpC.delete(ApiServerUrl.API_SERVER_DELETE+"softskill/"+id)
      .pipe(tap(data => console.log('SoftSkills -> DELETE -> OK', data)))
  }

  addHardSkill(body:Skill):Observable<any>{
    return this.httpC.post(ApiServerUrl.API_SERVER_NEW+"hardskill", body)
    .pipe(
      tap(() => {
        this._refresh$.next();
        console.log('HardSkills -> GET -> OK', body);
      })
    )
  }
  addSoftSkill(body:Skill):Observable<any>{
    return this.httpC.post(ApiServerUrl.API_SERVER_NEW+"softskill", body)
    .pipe(
      tap(() => {
        this._refresh$.next();
        console.log('SoftSkills -> GET -> OK', body);
      })
    )
}
}
