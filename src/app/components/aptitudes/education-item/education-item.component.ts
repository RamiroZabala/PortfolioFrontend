import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html'
})

export class EducationItemComponent {
  @Input() id: number = 0;
  @Input() title: string = "title here";
  @Input() description: string = "description here";
  @Input() period: string = "period here";
  @Input() img_icon: string = "";
  //
  @Input() delete: () => void = () => {this.onDelete(this.id);}; // inicialización por defecto
  @Input() public onDelete: (id:number) => void = (item) => {};
  //
  @Input() is_login: boolean = false;
}
