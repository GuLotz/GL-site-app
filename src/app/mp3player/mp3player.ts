import { Component } from '@angular/core';
import { song } from '../music/app.musicComponent';

@Component({
  selector: 'mp3player',
  templateUrl: 'mp3player.html',
})

export class mp3player{
  experiment='';
};

export function playAudio(){
  this.experiment='success';
}
