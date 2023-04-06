import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { DynamicComponentDirective } from 'src/app/directives/dynamic-component.directive';
import { Person } from 'src/app/models/models';
import { PersonDataService } from 'src/app/services/person-data.service';
import { FormAboutComponent } from 'src/app/components/modal/form-about/form-about.component';
import { IsLogin } from 'src/app/config/config-data';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements AfterViewInit {
  @Input() reloadHTML: () => void = () => {this.getData();}; // inicialización por defecto

  is_login: boolean = IsLogin.IS_LOGIN;


  @ViewChild(DynamicComponentDirective) dynamic !:DynamicComponentDirective;

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
  //data:any;
  age:any;

  constructor(private dataService:PersonDataService){}

  //ngOnInit(): void {
  ngAfterViewInit(): void {
    this.getData();
  }

  public getData(){
    this.dataService.getData().subscribe({
      next: (resp) => {
        this.data = resp[0];
        //console.log("Main -> Datos Personales: "+JSON.stringify(this.data));
        console.log("About -> OK");
        this.age = Math.floor(((Date.now() - Date.parse(this.data.birthdate)) / (1000 * 3600 * 24))/365);
        if(this.is_login) this.generateForm();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  generateForm():void {
    const viewContainerRef = this.dynamic.viewContainerRef;
    const containerRef = viewContainerRef.createComponent<any>(FormAboutComponent);
    containerRef.instance.defaultName = this.data.name;
    containerRef.instance.defaultLastName = this.data.lastname;
    containerRef.instance.defaultLongDescription = this.data.long_description;
    containerRef.instance.defaultShortDescription = this.data.short_description;
    containerRef.instance.defaultTitle = this.data.title;
    containerRef.instance.defaultNationality = this.data.nationality;
    containerRef.instance.defaultBirthDate = this.data.birthdate;
    containerRef.instance.defaultPfp = this.data.img_profile;
    containerRef.instance.defaultBanner = this.data.img_banner;
    containerRef.instance.defaultEmail = this.data.email;
    containerRef.instance.defaultPhone = this.data.phone;
    containerRef.instance.defaultFacebook = this.data.facebook_id;
    containerRef.instance.defaultInstagram = this.data.instagram_id;
    containerRef.instance.defaultTwitter = this.data.twitter_id;
    this.reloadHTML = this.reloadHTML.bind(this); ///////*
    containerRef.instance.onReloadHTML = this.reloadHTML;
    /*const i = this.childComponents.findIndex(c => c.instance.id === child.id);
    if (i !== -1) {
      this.childComponents[i].destroy();
      this.childComponents.splice(i, 1);
    }
    this.childComponents.push(containerRef);*/

  }
}
