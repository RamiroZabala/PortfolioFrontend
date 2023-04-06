import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationDataService } from 'src/app/services/authentication-data.service';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private autenticationService:AuthenticationDataService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var accessToken = this.autenticationService.getToken();
    // LOGOUT
    if(req.url.indexOf('/api/auth/logout') > -1){
      req=req.clone({
        setHeaders:{
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+accessToken
        }
      })
      console.log("Interceptor: /api/auth/logout ");
    }
    // AUTHENTICATION
    else if(req.url.indexOf('/api/auth/') > -1){
      req=req.clone({
        setHeaders:{
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
          'Content-Type': 'application/json'
        }
      })
      console.log("Interceptor: /api/auth/ ");
    }
    // GET DATA
    else if(req.url.indexOf('/api/get/') > -1){
      req=req.clone({
        setHeaders:{
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': '*',
          'Content-Type': 'application/json'
        }
      })
      console.log("Interceptor: /api/get/ ");
    }
    // DELETE DATA
    else if(req.url.indexOf('/api/delete/' ) > -1 && accessToken !== undefined){
      req=req.clone({
        setHeaders:{
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'Access-Control-Allow-Methods': 'DELETE',
          'Access-Control-Allow-Headers': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+accessToken
        },
        //withCredentials: true//NO SE SI ES NECESARIO
      })
      console.log("Interceptor: /api/delete/ ");
    }
    // NEW DATA
    else if(req.url.indexOf('/api/new/') > -1 && accessToken !== undefined){
      req=req.clone({
        setHeaders:{
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+accessToken
        }//,
        //withCredentials: true//NO SE SI ES NECESARIO
      })
      console.log("Interceptor: /api/new/ ");
    }


    return next.handle(req);
  }
}
