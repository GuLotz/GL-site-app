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
      {id: 1, title: 'song1', url: 'src\assets\songs\Livingroom-001_with bass and organ.mp3'},
      {id: 2, title: 'song2', url: 'src\assets\songs\Livingroom-001.mp3'}
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
