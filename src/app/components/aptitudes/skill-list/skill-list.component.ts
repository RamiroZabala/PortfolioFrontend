import { Component, ViewChild, ComponentRef , ComponentFactoryResolver, AfterViewInit, Input} from '@angular/core';
import { DynamicComponentDirective } from 'src/app/directives/dynamic-component.directive';
import { SkillDataService } from 'src/app/services/skill-data.service';
import { SkillItemComponent } from '../skill-item/skill-item.component';
import { Session } from 'src/app/config/config-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements AfterViewInit{
  @ViewChild(DynamicComponentDirective) dynamic !:DynamicComponentDirective;
  @Input() category:string ="";
  @Input() type:String = "";

  is_login: boolean = Session.IS_LOGGED;

  //
  data:any;
  childComponents: ComponentRef<any>[] = [];

  subscription: Subscription = new Subscription;
  
  constructor(private dataService:SkillDataService){}

  ngAfterViewInit(): void {
    this.getData();

    this.subscription = this.dataService.refresh$.subscribe(()=>{
      this.getData();
    })
  };

  generateChildComponents(data:[]):void {
    const viewContainerRef = this.dynamic.viewContainerRef;
    data.forEach((child: {id: number, skillname: string, value: string}) => {
      const containerRef = viewContainerRef.createComponent<any>(SkillItemComponent);
      containerRef.instance.type = this.type;
      containerRef.instance.category = this.category;
      containerRef.instance.id = child.id;
      containerRef.instance.skillname = child.skillname;
      containerRef.instance.value = child.value;
      containerRef.instance.is_login = this.is_login;
      this.deleteItem = this.deleteItem.bind(this); ///////*
      containerRef.instance.onDelete = this.deleteItem;
      const i = this.childComponents.findIndex(c => c.instance.id === child.id);
      if (i !== -1) {
        this.childComponents[i].destroy();
        this.childComponents.splice(i, 1);
      }
      this.childComponents.push(containerRef);
    });
  }
  getData(){
    if(this.type === "HARD"){
      // HARD SKILLS
      this.dataService.getHardSkillData().subscribe(data => {
        this.data = data.filter((data: { category: string; }) => data.category === this.category);
        this.generateChildComponents(this.data);
      });
    }else{
      this.dataService.getSoftSkillData().subscribe(data => {
        this.data = data.filter((data: { category: string; }) => data.category === this.category);
        this.generateChildComponents(this.data);
      });
    }
  }
  deleteItem(id:number){
    if(this.type === "HARD"){
      this.dataService.deleteHardSkill(id).subscribe(resp=>{
        // Filtro el array de componentes para encontrar el índice del componente con el id especificado
        const index = this.childComponents.findIndex(c => c.instance.id === id);
        // Si se encontró el componente, lo elimino
        if (index !== -1) {
          this.childComponents[index].destroy();
          this.childComponents.splice(index, 1);
        }
      });
    }
    else{
      this.dataService.deleteSoftSkill(id).subscribe(resp=>{
        // Filtro el array de componentes para encontrar el índice del componente con el id especificado
        const index = this.childComponents.findIndex(c => c.instance.id === id);
        // Si se encontró el componente, lo elimino
        if (index !== -1) {
          this.childComponents[index].destroy();
          this.childComponents.splice(index, 1);
        }
      });
    }
  }
}
