import { Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { EducationDataService } from 'src/app/services/education-data.service';
import { Education } from 'src/app/models/models';

@Component({
  selector: 'app-form-education',
  templateUrl: './form-education.component.html'
})

export class FormEducationComponent implements OnInit{
  @Input() modalId = "educationModal";
  @Input() modalTitle = "Agregar Educación";
  @Input() modalSubmitText = "Guardar";
  // DEFAULTS FORM INPUTS VALUES
  @Input() entryId:Number = -1;
  @Input() defaultTitle:String = "";
  @Input() defaultDescription:String = "";
  @Input() defaultPeriod:String = "2023";
  @Input() defaultImgUrl:String = "";
  //
  @Input() reloadHTML: () => any = () => {}; // inicialización por defecto

  Form:FormGroup = new FormGroup({});

  constructor(
  private formBuilder:FormBuilder,
  private dataService:EducationDataService){

  }

  ngOnInit(){
    this.Form=this.formBuilder.group(
      {
        //aca.....
        form_title:       [this.defaultTitle,         [Validators.required]],
        form_description: [this.defaultDescription,   [Validators.required]],
        form_period:      [this.defaultPeriod,        [Validators.required]],
        form_imgurl:      [this.defaultImgUrl,        [Validators.required]],
        //
        deviceInfo:this.formBuilder.group({deviceId:[""], deviceType:["DEVICE_TYPE_ANDROID"], notificationToken:[""]})
      }
    )
  }

  get Title(){
    return this.Form.get("form_title");
  }
  get Description(){
    return this.Form.get("form_description");
  }
  get Period(){
    return this.Form.get("form_period");
  }
  get ImgUrl(){
    return this.Form.get("form_imgurl");
  }
  get FormValid(){
    return (!this.Form.get("form_title")?.errors && !this.Form.get("form_descriptiobodyn")?.errors && !this.Form.get("form_period")?.errors && !this.Form.get("form_imgurl")?.errors);
  }

  onSend(event:Event){
    event.preventDefault();
    const body:Education = {
        id: this.entryId,
        title:this.Form.get('form_title')?.value,
        description:this.Form.get('form_description')?.value,
        period:this.Form.get('form_period')?.value,
        img_icon:this.Form.get('form_imgurl')?.value
      }
    this.dataService.addEducation(body).subscribe((data:any)=>{
      console.log("DATA:" + JSON.stringify(data));
      this.reloadHTML();
    })
  }
}
