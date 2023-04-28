import { Component, OnInit} from '@angular/core';
import { Person } from 'src/app/models/models';
import { PersonDataService } from 'src/app/services/person-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})



export class FooterComponent implements OnInit {
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
      },
      error: (error) => {
        console.error(error);
      }
    });    
  }
 }