import { Component } from '@angular/core';
import { appRoutes } from '../routing/app.routing';

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.html'
})

export class navigationComponent {
  NavigationRoutes: Navigation[];
  constructor(){
    //let NavigationRoutes: Navigation[]=[];
    let route;
    this.NavigationRoutes=[];
    for(route of appRoutes){
      if(route.data[1].tabTitle!=''){
        this.NavigationRoutes.push({path: route.path, tabTitle: route.data[1].tabTitle});
      }
    }
    console.log(this.NavigationRoutes);
  }
};

export interface Navigation{
  path: string;
  tabTitle: string;
}
