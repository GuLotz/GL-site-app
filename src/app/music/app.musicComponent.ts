import { Component, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { mp3player } from './mp3player/mp3player';
import { song } from './song.model'

@Component({
  selector: 'app-music',
  templateUrl: 'music.html'
})
export class musicComponent {
  songs: song[]=[
    new song(1, 'Livingroom-001_with bass and organ', 'assets/songs/Livingroom-001_with bass and organ.mp3'),
    new song(2, 'Livingroom-001', 'assets/songs/Livingroom-001.mp3'),
    new song(3, 'Livingroom-001b', 'assets/songs/Livingroom-001b.mp3'),
    new song(4, 'Livingroom-002', 'assets/songs/Livingroom-002.mp3'),
    new song(5, 'Livingroom-003_a', 'assets/songs/Livingroom003_a.mp3')
  ];
  activeSong: number;
  constructor(){
    this.activeSong=1;
  }
}

// export interface song {
//     id: number,
//     title: string,
//     url: string
// };
