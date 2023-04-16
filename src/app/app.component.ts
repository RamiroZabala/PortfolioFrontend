import { Component, OnInit } from '@angular/core';
import { AuthenticationDataService } from './services/authentication-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title:string = 'portfolio';
  IsLogin:string = "";

  constructor(private dataService:AuthenticationDataService){}

  ngOnInit(): void {
    this.dataService.isSessionValid().subscribe((isValid: boolean) => {

      if(isValid){
        this.IsLogin = "logged";
        sessionStorage.setItem('session', "1");
      }
      else{
        localStorage.removeItem("token");
        sessionStorage.removeItem("session");
      }
    });
  }
}
