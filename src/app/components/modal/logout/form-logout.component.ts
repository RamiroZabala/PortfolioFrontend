import { Component } from '@angular/core';
//import { Router } from '@angular/router';
import { AuthenticationDataService } from 'src/app/services/authentication-data.service';

@Component({
  selector: 'app-logout',
  templateUrl: './form-logout.component.html'
})
export class LogoutComponent{

  constructor(private dataService:AuthenticationDataService/*, private ruta:Router*/){}

  logout(){
    this.dataService.logOut().subscribe((data:any)=>{
      console.log("DATA:" + JSON.stringify(data));
      //this.ruta.navigate(['/']);
    })
  }
}
