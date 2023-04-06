import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Person } from 'src/app/models/models';
import { PersonDataService } from 'src/app/services/person-data.service';

@Component({
  selector: 'app-form-about',
  templateUrl: './form-about.component.html'
})

export class FormAboutComponent implements OnInit {
  @Input() modalId = "aboutModal";
  @Input() modalTitle = "Editar Información";
  @Input() modalSubmitText = "Guardar";
  // DEFAULTS FORM INPUTS VALUES
  @Input() defaultName:string = "";
  @Input() defaultTitle:string = "";
  @Input() defaultLastName:string = "";
  @Input() defaultLongDescription:string = "";
  @Input() defaultShortDescription:string = "";
  @Input() defaultNationality:string = "";
  @Input() defaultBirthDate:string = "";
  @Input() defaultPfp:string = "";
  @Input() defaultBanner:string = "";
  @Input() defaultEmail:string = "";
  @Input() defaultPhone:string = "";
  @Input() defaultFacebook:string = "";
  @Input() defaultInstagram:string = "";
  @Input() defaultTwitter:string = "";
  //
  @Input() reloadHTML: () => any = () => {}; // inicialización por defecto

  Form:FormGroup = new FormGroup({});

  constructor(
  private formBuilder:FormBuilder,
  private dataService:PersonDataService){

  }

  ngOnInit(){
    this.Form=this.formBuilder.group(
      {
        //aca.....
        form_name:          [this.defaultName,         [Validators.required]],
        form_lastname:      [this.defaultLastName,         [Validators.required]],
        form_description:   [this.defaultLongDescription,   [Validators.required]],
        form_title:         [this.defaultTitle,   [Validators.required]],
        form_nationality:   [this.defaultNationality,        [Validators.required]],
        form_birthdate:     [this.defaultBirthDate,        [Validators.required]],
        form_profilepic:    [this.defaultPfp,        [Validators.required]],
        form_email:         [this.defaultEmail,        [Validators.required]],
        form_phone:         [this.defaultPhone,        [Validators.required]],
        //
        deviceInfo:this.formBuilder.group({deviceId:[""], deviceType:["DEVICE_TYPE_ANDROID"], notificationToken:[""]})
      }
    )
  }

  get Name(){
    return this.Form.get("form_name");
  }
  get LastName(){
    return this.Form.get("form_lastname");
  }
  get LongDescription(){
    return this.Form.get("form_description");
  }
  get Title(){
    return this.Form.get("form_title");
  }
  get Nationality(){
    return this.Form.get("form_nationality");
  }
  get BirthDate(){
    return this.Form.get("form_birthdate");
  }
  get ProfilePic(){
    return this.Form.get("form_profilepic");
  }
  get Email(){
    return this.Form.get("form_email");
  }
  get Phone(){
    return this.Form.get("form_phone");
  }
  get FormValid(){
    return (
      !this.Form.get("form_name")?.errors &&
      !this.Form.get("form_lastname")?.errors &&
      !this.Form.get("form_description")?.errors &&
      !this.Form.get("form_title")?.errors &&
      !this.Form.get("form_nationality")?.errors &&
      !this.Form.get("form_birthdate")?.errors &&
      !this.Form.get("form_profilepic")?.errors &&
      !this.Form.get("form_email")?.errors &&
      !this.Form.get("form_phone")?.errors
    );
  }

  onSend(event:Event){
    event.preventDefault();
    const body:Person = {
        id: 1,
        name:this.Form.get('form_name')?.value,
        lastname:this.Form.get('form_lastname')?.value,
        long_description:this.Form.get('form_description')?.value,
        short_description:this.defaultShortDescription,
        title:this.Form.get('form_title')?.value,
        nationality:this.Form.get('form_nationality')?.value,
        birthdate:this.Form.get('form_birthdate')?.value,
        img_profile:this.Form.get('form_profilepic')?.value,
        img_banner:this.defaultBanner,
        email:this.Form.get('form_email')?.value,
        phone:this.Form.get('form_phone')?.value,
        facebook_id:this.defaultFacebook,
        instagram_id:this.defaultInstagram,
        twitter_id:this.defaultTwitter

      }
    this.dataService.addPerson(body).subscribe((data:any)=>{
      console.log("DATA:" + JSON.stringify(data));
      this.reloadHTML();
    })
  }
}
