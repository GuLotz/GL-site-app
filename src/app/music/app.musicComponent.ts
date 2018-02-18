import { Component } from '@angular/core';
import { mp3player } from '../mp3player/mp3player';
//import * as fs from '@angular/fs';

@Component({
  selector: 'music',
  templateUrl: 'music.html',
})
export class musicComponent  {
  /*
  constructor(){
    var any = fs.readdir("./songs",(err, files)=>{return(files)});
  };
  */

  songs : song[] = [
      {id: 1, title: 'Livingroom-001_with bass and organ', url: 'assets/songs/Livingroom-001_with bass and organ.mp3'},
      {id: 2, title: 'Livingroom-001', url: 'assets/songs/Livingroom-001.mp3'},
      {id: 3, title: 'Livingroom-001b', url: 'assets/songs/Livingroom-001b.mp3'},
      {id: 4, title: 'Livingroom-002', url: 'assets/songs/Livingroom-002.mp3'},
      {id: 5, title: 'Livingroom-003_a', url: 'assets/songs/Livingroom003_a.mp3'},
    ];
}

export interface song {
    id: number,
    title: string,
    url: string
};

/*
export class song {
  constructor(
    public id: number,
    public title: string,
    public url: string) { }
}
*/
