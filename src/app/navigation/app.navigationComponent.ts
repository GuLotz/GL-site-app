import { Component } from '@angular/core';
import { routes } from '../routing/app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: 'app-navigation.html',
  styleUrl: 'app-navigation.scss',
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
