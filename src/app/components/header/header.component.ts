import { Component } from '@angular/core';
import { IsLogin } from 'src/app/config/config-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {is_login: boolean = IsLogin.IS_LOGIN;}
