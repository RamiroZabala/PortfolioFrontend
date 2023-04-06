import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Education } from '../models/models';
import { ApiServerUrl } from '../config/config-data';

@Injectable({
  providedIn: 'root'
})
export class EducationDataService {

  constructor(private httpC:HttpClient) { }

  getEducationData():Observable<any>{
    return this.httpC.get<Education>(ApiServerUrl.API_SERVER_GET+"education");
  }
  deleteEducation(id:number):Observable<any>{
    return this.httpC.delete(ApiServerUrl.API_SERVER_DELETE+"education/"+id);
  }
  addEducation(body:Education):Observable<any>{
    return this.httpC.post(ApiServerUrl.API_SERVER_NEW+"education", body);
  }
}
