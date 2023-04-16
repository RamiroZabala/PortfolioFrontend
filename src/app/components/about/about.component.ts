import { Component, OnInit, Input, AfterViewInit, ViewChild, NgModule } from '@angular/core';
import { DynamicComponentDirective } from 'src/app/directives/dynamic-component.directive';
import { Person } from 'src/app/models/models';
import { PersonDataService } from 'src/app/services/person-data.service';
import { FormAboutComponent } from 'src/app/components/modal/form-about/form-about.component';
import { Session } from 'src/app/config/config-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements AfterViewInit {
  
  subscription: Subscription = new Subscription;

  is_login: boolean = Session.IS_LOGGED;

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

    this.subscription = this.dataService.refresh$.subscribe(()=>{
      this.getData();
    })
  }

  public getData(){
    this.dataService.getData().subscribe({
      next: (resp) => {
        this.data = resp[0];
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
    /*const i = this.childComponents.findIndex(c => c.instance.id === child.id);
    if (i !== -1) {
      this.childComponents[i].destroy();
      this.childComponents.splice(i, 1);
    }
    this.childComponents.push(containerRef);*/
  }
}
