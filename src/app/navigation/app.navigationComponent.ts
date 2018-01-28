import { Component } from '@angular/core';
import { appRoutes } from '../routing/app.routing';

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.html'
})
export class navigationComponent {
  appRoutes: object;
  constructor(){
    this.appRoutes = appRoutes;
    this.appRoutes.splice(0,1);
    this.appRoutes.splice(this.appRoutes.length-1,1)
  }
};
