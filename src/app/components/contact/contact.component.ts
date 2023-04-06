import { Component, OnInit, NgModule} from '@angular/core';
import { PersonDataService } from 'src/app/services/person-data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {
  data:any;

  constructor(private dataService:PersonDataService){}

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (resp) => {
        this.data = resp[0];
        console.log("Main -> Datos Personales: "+JSON.stringify(this.data));
      },
      error: (error) => {
        console.error(error);
      }
    });    
  }
 }