import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Person } from 'src/app/models/models';
import { PersonDataService } from 'src/app/services/person-data.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

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
  constructor(private dataService:PersonDataService, private elRef: ElementRef){}
  
  getHeight(): number {
    return window.innerHeight - this.elRef.nativeElement.querySelector('#main').offsetTop;
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Actualizar la altura del elemento si cambia la altura de la ventana
    // Puedes llamar a getHeight() aquí y asignar su valor a una propiedad del componente
  }


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
