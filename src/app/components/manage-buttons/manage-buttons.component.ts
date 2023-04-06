import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-manage-buttons',
  templateUrl: './manage-buttons.component.html',
  styleUrls: ['./manage-buttons.component.scss']
})

export class ManageButtonsComponent {
  @Input() id: number = 0;
  //
  @Input() button_add = false;
  @Input() button_edit = false;
  @Input() button_delete = false;
  //
  @Input() modal_id_add = "";
  @Input() modal_id_edit = "";
  //
  @Input() onClickAdd: () => any = () => {}; // inicialización por defecto
  @Input() onClickEdit: () => any = () => {}; // inicialización por defecto
  @Input() onClickDelete: () => any = () => {}; // inicialización por defecto
}
