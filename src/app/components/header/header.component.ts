import { Component } from '@angular/core';
import { Session } from 'src/app/config/config-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  is_login: boolean = Session.IS_LOGGED;
}
