import { Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { WorkProject } from 'src/app/models/models';
import { WorkProjectDataService } from 'src/app/services/workproject-data.service';

@Component({
  selector: 'app-form-workproject',
  templateUrl: './form-workproject.component.html'
})

export class FormWorkprojectComponent implements OnInit{
  @Input() modalId = "workprojectModal";
  @Input() modalTitle = "Agregar Trabajo";
  @Input() modalSubmitText = "Guardar";
  // DEFAULTS FORM INPUTS VALUES
  @Input() entryId:Number = -1;
  @Input() defaultTitle:String = "";
  @Input() defaultDescription:String = "";
  @Input() defaultPeriod:String = "2023";
  @Input() defaultImgUrl:String = "";
  @Input() defaultUrl:String = "";

  Form:FormGroup = new FormGroup({});;

  constructor(
  private formBuilder:FormBuilder,
  private dataService:WorkProjectDataService){

  }

  ngOnInit(){
    this.Form=this.formBuilder.group(
      {
        //aca.....
        form_title:       [this.defaultTitle,         [Validators.required]],
        form_description: [this.defaultDescription,   [Validators.required]],
        form_period:      [this.defaultPeriod,        [Validators.required]],
        form_imgurl:      [this.defaultImgUrl,        [Validators.required]],
        form_url:         [this.defaultUrl,        [Validators.required]],
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
  get Url(){
    return this.Form.get("form_url");
  }
  get FormValid(){
    return (!this.Form.get("form_title")?.errors && !this.Form.get("form_description")?.errors && !this.Form.get("form_period")?.errors && !this.Form.get("form_imgurl")?.errors && !this.Form.get("form_url")?.errors);
  }

  onSend(event:Event){
    event.preventDefault();
    const body:WorkProject = {
        id: this.entryId,
        title:this.Form.get('form_title')?.value,
        description:this.Form.get('form_description')?.value,
        period:this.Form.get('form_period')?.value,
        img:this.Form.get('form_imgurl')?.value,
        url:this.Form.get('form_url')?.value
      }
    this.dataService.addWorkProject(body).subscribe((data:any)=>{
      console.log("DATA:" + JSON.stringify(data));
    })
  }
}
