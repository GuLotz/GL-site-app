import { routes } from '../routing/app-routing.module';
/*
@Component({
    selector: 'app-navigation',
    templateUrl: 'navigation.html',
    standalone: false
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
*/

import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterOutlet, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: 'app-navigation.html',
  styleUrl: 'app-navigation.css',
  imports: [MatTabsModule, MatButtonModule, RouterOutlet]
})
export class navigationComponent {
  NavigationRoutes: any[];
  activeLink: any;
  constructor(private router: Router) {
    //let NavigationRoutes: Navigation[]=[];
    let route;
    this.NavigationRoutes = [];
    for (route of routes) {
      if (route.data[1].tabTitle != '') {
        this.NavigationRoutes.push({ path: route.path, tabTitle: route.data[1].tabTitle });
      }
    }
    this.activeLink = this.NavigationRoutes[0];
  }

  navigateTo(route) {
    this.activeLink = '/' + route.path;
    this.router.navigateByUrl(this.activeLink)
  }

}
