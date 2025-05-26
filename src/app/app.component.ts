import { Component } from '@angular/core';

import { navigationComponent } from './navigation/app.navigationComponent';
import { headerComponent } from './header/app.headerComponent';

@Component({
  selector: 'app-gl-site',
  templateUrl: 'app.component.html',
  standalone: false,
  styleUrl: '../assets/styles/main.scss'
})
export class AppComponent  {

}

export var pageHeaderTitle:string;
