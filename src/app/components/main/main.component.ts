import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/models';
import { PersonDataService } from 'src/app/services/person-data.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'})

export class MainComponent implements OnInit {

  data: Person = {
    id: 0,
    name: '',
    lastname: '',
    long_description: '',
    short_description: '',
    title: '',
    nationality: '',
    birthdate: '',
    img_profile: '',
    img_banner: '',
    email: '',
    phone: '',
    facebook_id: '',
    instagram_id: '',
    twitter_id: ''
  };

  constructor(private dataService:PersonDataService){}

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (resp) => {
        this.data = resp[0];
        //console.log("Main -> Datos Personales: "+JSON.stringify(this.data));
        console.log("Main -> OK");
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
