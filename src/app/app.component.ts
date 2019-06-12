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

//Start of Experiment to try and get swipe working
  private swipeCoord?: [number, number];
  private swipeTime?: number;

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000 //
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
          const swipe = direction[0] < 0 ? 'next' : 'previous';
          // Do whatever you want with swipe
          console.log(this.swipe);
      }
    }
  }
//End of Experiment

}

export var pageHeaderTitle:string;
