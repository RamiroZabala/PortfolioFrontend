import { Component, OnInit } from '@angular/core';
import { IsLogin } from 'src/app/config/config-data'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  title:string = 'portfolio';
  IsLogin:string = IsLogin.IS_LOGIN? "logged":"";
  constructor(){}
}
