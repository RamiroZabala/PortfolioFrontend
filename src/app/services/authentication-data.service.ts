import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs';
import { Credentials } from '../models/auth-model';
import { ApiServerUrl } from '../config/config-data';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationDataService {

  currentUserSubject: BehaviorSubject<any>;

  constructor(private httpC:HttpClient) {
    console.log("El servicio de autenticacion está corriendo")
    this.currentUserSubject=new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')|| '{}'))
  }
  logIn(creds:Credentials):Observable<any>{
    return this.httpC.post(ApiServerUrl.API_SERVER_LOGIN, creds).pipe(
      map(async (response: any) => {
        const headers = response.headers;

        let token: string = "TOKEN HERE PLEASE";
        try {
          token = headers.get('Authorization').replace('Bearer ', '');
        } catch (error) {
          token = response.token;
        }

        localStorage.setItem('token', token);
        sessionStorage.setItem('session', "1");
        location.reload(); // Recargar la página actual

        return response;
      }),
      catchError(error => {
        console.log('Error:', error);
        return error;
      })
    );
  }
  getToken(){
    return localStorage.getItem('token');
  }
  logOut():Observable<any>{
    return this.httpC.post(ApiServerUrl.API_SERVER_LOGOUT, "").pipe(
      map(async (response: any) => {
        localStorage.removeItem('token');
        location.reload(); // Recargar la página actual
        return response;
      }),
      catchError(error => {
        console.log('Error:', error);
        return error;
      })
    );
  }

  isSessionValid(): Observable<boolean> {
    return this.httpC.get<boolean>(ApiServerUrl.API_SERVER_SESSIONSTATUS).pipe(
      map((response: boolean) => {
        console.log("Sesión recuperada: " + response);
        return response;
      }),
      catchError((error: any) => {
        //console.log("Error al verificar el estado de la sesión: ", error);
        return of(false);
      })
    );
  }
  
}
