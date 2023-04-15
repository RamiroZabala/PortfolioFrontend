import { Component, OnInit} from '@angular/core';
import { PersonDataService } from 'src/app/services/person-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})



export class FooterComponent implements OnInit {
  data:any;

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