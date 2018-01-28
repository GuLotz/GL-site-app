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
    // this is dirty. I know here, that I do not want to show path'' and path'**' and I know their position
    // throws an error, as appRoutes is not an array, but an object
    // Works anyway in the transpiled JS
    this.appRoutes.splice(0,1);
    this.appRoutes.splice(this.appRoutes.length-1,1)
  }
};
