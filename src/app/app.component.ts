import { Component } from '@angular/core';

import { navigationComponent } from './navigation/app.navigationComponent';
import { headerComponent } from './header/app.headerComponent';
import { contentComponent } from './content/app.contentComponent';
import { meMyselfAndIComponent } from './meMyselfAndI/app.meMyselfAndIComponent';
import { musicComponent } from './music/app.musicComponent';

@Component({
  selector: 'app-gl-site',
  templateUrl: 'app.component.html',
})
export class AppComponent  {

}

export var pageHeaderTitle:string;
