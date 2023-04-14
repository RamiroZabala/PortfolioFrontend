import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationDataService } from 'src/app/services/authentication-data.service';

@Component({
  selector: 'app-logout',
  templateUrl: './form-logout.component.html'
})
export class LogoutComponent{
  @ViewChild('submitButtonLogout') submitButton: ElementRef<HTMLButtonElement> | undefined;

  constructor(private dataService:AuthenticationDataService/*, private ruta:Router*/){}

  logout(){
    if (this.submitButton) {
      this.submitButton.nativeElement.classList.add('disabled');
      this.submitButton.nativeElement.innerHTML = '<div class="spinner-border text-light" role="status"><span class="visually-hidden">Loading...</span></div>';
    }
    this.dataService.logOut().subscribe((data:any)=>{
      console.log("DATA:" + JSON.stringify(data));
      //this.ruta.navigate(['/']);
    })
  }
}
