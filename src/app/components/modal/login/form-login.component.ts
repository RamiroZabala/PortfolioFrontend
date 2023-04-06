import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/auth-model';
import { AuthenticationDataService } from 'src/app/services/authentication-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './form-login.component.html'
})
export class LoginComponent{

  Form:FormGroup;

  constructor(
  private formBuilder:FormBuilder,
  private dataService:AuthenticationDataService,
  private ruta:Router){
    this.Form=this.formBuilder.group(
      {
        email:["",[Validators.required,Validators.email]],
        password:["",[Validators.required,Validators.minLength(8)]],
        deviceInfo:this.formBuilder.group({
          deviceId:[""],
          deviceType:["DEVICE_TYPE_ANDROID"],
          notificationToken:[""]
        })
      }
    )
  }

  get Email(){
    return this.Form.get("email");
  }
  get Password(){
    return this.Form.get("password");
  }
  get FormValid(){
    return (!this.Form.get("email")?.errors && !this.Form.get("password")?.errors);
  }

  login(event:Event){
    event.preventDefault();

    const creds:Credentials = {
      email: this.Form.get('email')?.value,
      password:this.Form.get('password')?.value
    }

    this.dataService.logIn(creds).subscribe((data:any)=>{
      console.log("DATA:" + JSON.stringify(data));
      this.ruta.navigate(['/']);
    })
  }
}
