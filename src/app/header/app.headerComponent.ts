import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { appRoutes } from "../routing/app.routing";

@Component({
  selector: 'app-header',
  templateUrl: 'header.html',
  inputs: ['headerTitle']
})

export class headerComponent{
  @Input()
  headerTitle:string;

  @Output()
  change = new EventEmitter();

  constructor(private route: ActivatedRoute, private router: Router){
    //this.headerTitle=route.snapshot.data['headerImageURL'];
    //console.log("Data: ", appRoutes)
    this.headerTitle='Defined in constructor()';
    console.log("headerTitle: ", this.headerTitle);
  };

  ngOnInit() {
    /* this subscription will fire always when the url changes */
    this.router.events.subscribe(val=> {

      /* the router will fire multiple events */
      /* we only want to react if it's the final active route */
      if (val instanceof NavigationEnd) {

       /* the variable curUrlTree holds all params, queryParams, segments and fragments from the current (active) route */
       //let curUrlTree = this.router.parseUrl(this.router.url);
       //console.info("curUrlTree: " , curUrlTree);

       this.headerTitle=this.router.routerState.root.snapshot.firstChild.data["0"].headerImageURL.toString();
       console.info("headerImageURL: ", this.router.routerState.root.snapshot.firstChild.data["0"].headerImageURL);
       console.log("this.headerTitle: ", this.headerTitle);
       this.change.emit(this.headerTitle);
      }
    });
  }
}
