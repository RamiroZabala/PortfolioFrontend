import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Skill } from '../models/models';
import { ApiServerUrl } from '../config/config-data';

@Injectable({
  providedIn: 'root'
})
export class SkillDataService {

  constructor(private httpC:HttpClient) { }

  getHardSkillData():Observable<any>{
    return this.httpC.get<Skill>(ApiServerUrl.API_SERVER_GET+"hardskill");
  };
  getSoftSkillData():Observable<any>{
    return this.httpC.get<Skill>(ApiServerUrl.API_SERVER_GET+"softskill");
  };

  deleteHardSkill(id:number):Observable<any>{
    return this.httpC.delete(ApiServerUrl.API_SERVER_DELETE+"hardskill/"+id);
  }
  deleteSoftSkill(id:number):Observable<any>{
    return this.httpC.delete(ApiServerUrl.API_SERVER_DELETE+"softskill/"+id);
  }

  addHardSkill(body:Skill):Observable<any>{
      return this.httpC.post(ApiServerUrl.API_SERVER_NEW+"hardskill", body);
  }
  addSoftSkill(body:Skill):Observable<any>{
    return this.httpC.post(ApiServerUrl.API_SERVER_NEW+"softskill", body);
}
}
