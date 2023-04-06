import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { SkillDataService } from 'src/app/services/skill-data.service';
import { Skill } from 'src/app/models/models';

@Component({
  selector: 'app-form-skill',
  templateUrl: './form-skill.component.html'

})

export class FormSkillComponent implements OnInit{
  @Input() category:String = "";
  @Input() type:String = "";
  @Input() categoryDisabled:Boolean = true;
  //
  @Input() modalId = "skillModal";
  @Input() modalTitle = "Agregar Educación";
  @Input() modalSubmitText = "Guardar";
  // DEFAULTS FORM INPUTS VALUES
  @Input() entryId:Number = -1;
  @Input() skillname:String = "";
  @Input() value:Number = 100;
  //
  @Input() reloadHTML: () => any = () => {}; // inicialización por defecto

  Form:FormGroup = new FormGroup({});;
  selectOptions: Array<{ label: string, value: string }> = [];

  //
  constructor(
    private formBuilder:FormBuilder,
    private dataService:SkillDataService){}
  //
  ngOnInit(): void {
      if(this.type==="HARD"){
        this.selectOptions = [
          { label: 'Frontend', value: 'Frontend' },
          { label: 'Backend', value: 'Backend' },
          { label: 'Others', value: 'Others' }
        ];
      }
      else{
        this.selectOptions = [
          { label: 'Soft', value: 'Soft' },
          { label: 'Language', value: 'Language' }
        ]
      }
      if (this.category) {this.category = this.category.trim();} else {this.category = 'Others';}
      if (this.type) {this.type = this.type.trim();} else {this.type = 'SOFT';}
      this.Form=this.formBuilder.group(
        {
          //aca.....
          form_skillname:[this.skillname,                       [Validators.required]],
          form_category:[{value:this.category, disabled: this.categoryDisabled}, [Validators.required]],
          form_value:[this.value,                               [Validators.required, Validators.maxLength]],
          //
          deviceInfo:this.formBuilder.group({deviceId:[""], deviceType:["DEVICE_TYPE_ANDROID"], notificationToken:[""]
          })
        }
      )
  }
  //
  get SkillName(){
    return this.Form.get("form_skillname");
  }
  get Category(){
    return this.Form.get("form_category");
  }
  get Value(){
    return this.Form.get("form_value");
  }
  get FormValid(){
    return (!this.Form.get("form_skillname")?.errors && !this.Form.get("form_category")?.errors && !this.Form.get("form_value")?.errors);
  }
  //
  onSend(event:Event){
    event.preventDefault();
    const body:Skill = {
      id:this.entryId,
      skillname:this.Form.get('form_skillname')?.value,
      category:this.Form.get('form_category')?.value,
      value:this.Form.get('form_value')?.value }
    if(this.type==="HARD"){
      this.dataService.addHardSkill(body).subscribe((data:any)=>{
        console.log("DATA:" + JSON.stringify(data));
        this.reloadHTML();
      })
    }
    else {
      this.dataService.addSoftSkill(body).subscribe((data:any)=>{
        console.log("DATA:" + JSON.stringify(data));
        this.reloadHTML();
      })
    }
  }
}
