import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-work-project-item',
  templateUrl: './work-project-item.component.html',
  styleUrls: ['./work-project-item.component.scss']
})

export class WorkProjectItemComponent {
  @Input() id: number = 0;
  @Input() title: string = "title here";
  @Input() description: string = "description here";
  @Input() period: string = "period here";
  @Input() img: string = "";
  @Input() url: string = "";
  //
  @Input() is_even: boolean = false;
  //
  @Input() delete: () => void = () => {this.onDelete(this.id);}; // inicialización por defecto
  @Input() public onDelete: (id:number) => void = (item) => {};
  //
  @Input() is_login: boolean = false;
}
