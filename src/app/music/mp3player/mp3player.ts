import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { song } from '../song.model';
//import { songs } from '../app.musicComponent';

//The question is, how to get hold of the songs:song[] defined in music.component.ts

@Component({
  selector: 'app-mp3player',
  templateUrl: 'mp3player.html',
})

export class mp3player{
  playMode:string ='pausing';
  playPauseGlyphicon: string ='glyphicon-play';
  //songNumber:number = 1;

  @Input() Songs:song[];
  @Input() songNumber: number;
  @Output() songNumberChange: EventEmitter<number> = new EventEmitter<number>();

/*
  ngOnInit(){
    this.songNumber=1;
  }
*/
  playAudio(){
    var myPlayer:any = document.getElementById("audioPlayer");
    if (this.playMode==='playing'){
      this.playMode='pausing';
      myPlayer.pause();
      this.playPauseGlyphicon='glyphicon-play';
      console.log('Button Action: pause');
    }
    else{
      if (this.playMode==='pausing'){
        this.playMode='playing';
        myPlayer.play();
        this.playPauseGlyphicon='glyphicon-pause';
        console.log('Button Action: play song number' + this.songNumber + " " + this.Songs[this.songNumber].title);
      }
      else{
        console.log('wrong content of variable playmode:' + this.playMode);
      }
    }
  }
  stopAudio(){
    var myPlayer:any = document.getElementById("audioPlayer");
    this.playMode='pausing';
    myPlayer.pause();
    myPlayer.currentTime = 0;
    this.playPauseGlyphicon='glyphicon-play';
    console.log('Button Action: stop');
  }
  goToPreviousSong(){
    var myPlayer:any = document.getElementById("audioPlayer");
    this.playMode='playing';
    this.playPauseGlyphicon='glyphicon-pause';
    this.songNumber-=1;

    if (this.songNumber==-1){
      this.songNumber = this.Songs.length-1;
    }
    this.songNumberChange.emit(this.songNumber);
    myPlayer.src = this.Songs[this.songNumber].url;
    myPlayer.currentTime = 0;
    myPlayer.play();
    console.log('Button Action: previous. Playing song number ' + this.songNumber);
  }
  goToNextSong(){
    var myPlayer:any = document.getElementById("audioPlayer");
    this.playMode='playing';
    this.playPauseGlyphicon='glyphicon-pause';
    this.songNumber+=1;
    if (this.songNumber==this.Songs.length){
      this.songNumber=0;
    }
    this.songNumberChange.emit(this.songNumber);
    myPlayer.src = this.Songs[this.songNumber].url;
    myPlayer.currentTime = 0;
    myPlayer.play();
    console.log('Button Action: next. Playing song number ' + this.songNumber);
  }
};
