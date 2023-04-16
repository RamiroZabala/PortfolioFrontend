import { Component, Input, ViewChild, ComponentRef , ComponentFactoryResolver, AfterViewInit} from '@angular/core';
import { DynamicComponentDirective } from 'src/app/directives/dynamic-component.directive';
import { EducationDataService } from 'src/app/services/education-data.service';
import { EducationItemComponent } from '../education-item/education-item.component';
import { Session } from 'src/app/config/config-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-education-list',
  templateUrl: './education-list.component.html'
})
export class EducationListComponent implements AfterViewInit {
  
  subscription: Subscription = new Subscription;

  is_login: boolean = Session.IS_LOGGED;

  @ViewChild(DynamicComponentDirective) dynamic !:DynamicComponentDirective;

  data: any;
  childComponents: ComponentRef<any>[] = [];

  constructor(private dataService:EducationDataService){}

  ngAfterViewInit(): void {
    this.getData();

    this.subscription = this.dataService.refresh$.subscribe(()=>{
      this.getData();
    })
  }

  generateChildComponents():void {
    const viewContainerRef = this.dynamic.viewContainerRef;
    this.data.forEach((child: {id: number, title: string, description: string, period:string, img_icon:string}) => {
      const containerRef = viewContainerRef.createComponent<any>(EducationItemComponent);
      containerRef.instance.id = child.id;
      containerRef.instance.title = child.title;
      containerRef.instance.description = child.description;
      containerRef.instance.period = child.period;
      containerRef.instance.img_icon = child.img_icon;
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
  public getData(){
    this.dataService.getEducationData().subscribe({
      next: (resp) => {
        this.data = resp;
        this.generateChildComponents();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  deleteItem(id:number){
    this.dataService.deleteEducation(id).subscribe(resp=>{
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