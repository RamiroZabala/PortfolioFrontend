import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html'
})

export class SkillItemComponent {
  @Input() type:String = "HARD"// Solo para editar
  @Input() category:String = "Others"// Solo para editar
  @Input() id: number = 0;
  @Input() skillname: string = "Title here";
  @Input() value: number = 0;
  //
  @Input() reloadHTML: () => void = () => {this.onReloadHTML();}; // inicialización por defecto
  @Input() public onReloadHTML: () => void = () => {};
  //
  @Input() delete: () => void = () => {this.onDelete(this.id);}; // inicialización por defecto
  @Input() public onDelete: (id:number) => void = (item) => {};
  //
  @Input() is_login: boolean = false;
}
