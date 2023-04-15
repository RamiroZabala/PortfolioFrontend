import { Component, Input, ViewChild, ComponentRef , ComponentFactoryResolver, AfterViewInit} from '@angular/core';
import { DynamicComponentDirective } from 'src/app/directives/dynamic-component.directive';
import { WorkProjectDataService } from 'src/app/services/workproject-data.service';
import { WorkProjectItemComponent } from '../work-project-item/work-project-item.component';
import { IsLogin } from 'src/app/config/config-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-work-project-list',
  templateUrl: './work-project-list.component.html'
})

export class WorkProjectListComponent implements AfterViewInit {

  is_login: boolean = IsLogin.IS_LOGIN;


  @ViewChild(DynamicComponentDirective) dynamic !:DynamicComponentDirective;

  data: any;
  childComponents: ComponentRef<any>[] = [];
  
  subscription: Subscription = new Subscription;

  constructor(private dataService:WorkProjectDataService){}

  ngAfterViewInit(): void {
    this.getData();

    this.subscription = this.dataService.refresh$.subscribe(()=>{
      this.getData();
    })
  }

  generateChildComponents():void {
    const viewContainerRef = this.dynamic.viewContainerRef;
    let isEven:boolean = false;
    this.data.forEach((child: {id: number, title: string, description: string, period:string, img:string, url:String}) => {
      const containerRef = viewContainerRef.createComponent<any>(WorkProjectItemComponent);
      containerRef.instance.is_even = isEven;
      isEven=!isEven;
      containerRef.instance.id = child.id;
      containerRef.instance.title = child.title;
      containerRef.instance.description = child.description;
      containerRef.instance.period = child.period;
      containerRef.instance.img = child.img;
      containerRef.instance.url = child.url;
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
    this.dataService.getWorkProjectData().subscribe({
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
    this.dataService.deleteWorkProject(id).subscribe(resp=>{
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