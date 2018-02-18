import { Component, OnInit } from '@angular/core';
import { song } from '../music/app.musicComponent';

//The question is, how to get hold of the songs:song[] defined in music.component.ts

@Component({
  selector: 'app-mp3player',
  templateUrl: 'mp3player.html',
})

export class mp3player{
  playMode:string ='pausing';
  playPauseGlyphicon: string ='glyphicon-play';
  songNumber:number = 1;

  playAudio(){
    if (this.playMode==='playing'){
      this.playMode='pausing';
      this.playPauseGlyphicon='glyphicon-play';
      console.log('Button Action: pause');
    }
    else{
      if (this.playMode==='pausing'){
        this.playMode='playing';
        this.playPauseGlyphicon='glyphicon-pause';
        console.log('Button Action: play song number' + this.songNumber);
      }
      else{
        console.log('wrong content of variable playmode:' + this.playMode);
      }
    }
  }
  stopAudio(){
    this.playMode='pausing';
    this.playPauseGlyphicon='glyphicon-play';
    console.log('Button Action: stop');
  }
  goToPreviousSong(){
    console.log('Button Action: previous. Playing song number ' + this.songNumber);
    this.playMode='playing';
    this.playPauseGlyphicon='glyphicon-pause';
    this.songNumber-=1;
    if (this.songNumber===0){
      this.songNumber = this.songs.length();
    }
  }
  goToNextSong(){
    console.log('Button Action: next. Playing song number ' + this.songNumber);
    this.playMode='playing';
    this.playPauseGlyphicon='glyphicon-pause';
    this.songNumber+=1;
    if (this.songNumber===this.songs.length()){
      this.songNumber=1;
    }
  }
};
