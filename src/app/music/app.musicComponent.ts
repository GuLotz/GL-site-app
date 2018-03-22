import { Component, ViewChild, AfterViewInit  } from '@angular/core';
import { NgClass } from '@angular/common';
import { song } from './song.model'

@Component({
  selector: 'app-music',
  templateUrl: 'music.html'
})

export class musicComponent {
  @ViewChild('audioPlayer') myPlayer;

  playMode:string ='pausing';

  progress:string ='0%';

  songs: song[]=[
    new song( 1, 'Guitar Rock', 'assets/songs/GunAudio5b.mp3'),
    new song( 2, 'Gritty Organ', 'assets/songs/QS8.2_018.mp3'),
    new song( 3, "Ceci n'est pas une Pipe",'assets/songs/Pipe_Organ_1.mp3'),
    new song( 4, "Experiment with Cakewalk's Z3tA+",'assets/songs/SoftSynth003.mp3'),
    new song( 5, 'Number 19','assets/songs/Number 19.mp3'),
    new song( 6, 'Number 22','assets/songs/QS8.2_022.mp3'),
    new song( 7, 'Number 23','assets/songs/QS8.2_023.mp3'),
    new song( 8, 'Number 24','assets/songs/QS8.2_024.mp3'),
    new song( 9, 'Number 26','assets/songs/Song 26.mp3'),
    new song(10, 'Number 27','assets/songs/Song 27.mp3'),
    new song(11, 'Technical No. 28','assets/songs/Song 28.mp3'),
    new song(12, 'Technical No. 28b','assets/songs/Song 28b.mp3'),
    new song(13, 'Technical No. 28c','assets/songs/Song 28c.mp3'),
    new song(14, 'Number 29','assets/songs/Song 29.mp3'),
    new song(15, 'Livingroom-001', 'assets/songs/Livingroom-001.mp3'),
    //new song(15.5, 'Livingroom-001b', 'assets/songs/Livingroom-001b.mp3'),
    new song(16, 'Livingroom-001_with bass and organ', 'assets/songs/Livingroom-001_with bass and organ.mp3'),
    new song(17, 'Livingroom-002', 'assets/songs/Livingroom-002.mp3'),
    new song(18, "Pia's favourite", 'assets/songs/Pias_Favourite.mp3'),
    new song(19, '1995-2016 (Song 13)','assets/songs/1995-2016_13.mp3'),
    new song(20, '1995-2016 (Song 15)','assets/songs/1995-2016-15_CD-Format.mp3'),
    new song(21, '2016 (Song 31)','assets/songs/QS8.2_31_CD-Format.mp3'),
    new song(22, 'Now for something completely different (Song 54)','assets/songs/Simple54_Klass-CD.mp3'),
    new song(23, '1997-2016 (Number 50)','assets/songs/1997-2016_50.mp3'),
    new song(24, 'Living Room 003 (The piano timing will make Pachelbel turn in his grave)','assets/songs/Livingroom003_a.mp3'),
    new song(25, 'Up Beat Number 34','assets/songs/QS8.2_34.mp3'),
    new song(26, 'Number 35','assets/songs/QS8.2_35.mp3'),
    new song(27, 'Number 37','assets/songs/QS8.2_37b.mp3')
    //new song(14, '','assets/songs/'),
    //new song(14, '','assets/songs/'),
    //new song(14, '','assets/songs/'),
    //new song(14, '','assets/songs/'),
  ];

  activeSong: number;

  constructor(){
    this.activeSong=0;
  }

  ngAfterViewInit(){
    this.myPlayer.nativeElement.onended=()=>{
      this.playMode='playing';
      this.activeSong+=1;
      if (this.activeSong==this.songs.length){
        this.activeSong=0;
      }
      this.myPlayer.nativeElement.src = this.songs[this.activeSong].url;
      this.myPlayer.nativeElement.currentTime = 0;
      this.myPlayer.nativeElement.play();
    }

    this.myPlayer.nativeElement.ontimeupdate=()=>{
      this.progress=this.myPlayer.nativeElement.currentTime/this.myPlayer.nativeElement.duration*100 + "%";
      //console.log('timeupdate: progress: ' + this.progress);
    }

  }

  //playAudio(myPlayer: HTMLAudioElement){
  playAudio(){
    if (this.playMode==='playing'){
      this.playMode='pausing';
      this.myPlayer.nativeElement.pause();
      console.log('Button Action: pause');
    }
    else{
      if (this.playMode==='pausing'){
        this.playMode='playing';
        this.myPlayer.nativeElement.play();
        console.log('Button Action: play song number' + this.activeSong + " " + this.songs[this.activeSong].title);
      }
      else{
        console.log('wrong content of variable playmode:' + this.playMode);
      }
    }
  }
  stopAudio(){
    //var myPlayer:any = document.getElementById("audioPlayer");
    this.playMode='pausing';
    this.myPlayer.nativeElement.pause();
    this.myPlayer.nativeElement.currentTime = 0;
    console.log('Button Action: stop');
  }
  goToPreviousSong(){
    //var myPlayer:any = document.getElementById("audioPlayer");
    this.playMode='playing';
    this.activeSong-=1;

    if (this.activeSong==-1){
      this.activeSong = this.songs.length-1;
    }
    this.myPlayer.nativeElement.src = this.songs[this.activeSong].url;
    this.myPlayer.nativeElement.currentTime = 0;
    this.myPlayer.nativeElement.play();
    console.log('Button Action: previous. Playing song number ' + this.activeSong);
  }
  goToNextSong(){
    //var myPlayer:any = document.getElementById("audioPlayer");
    this.playMode='playing';
    this.activeSong+=1;
    if (this.activeSong==this.songs.length){
      this.activeSong=0;
    }
    this.myPlayer.nativeElement.src = this.songs[this.activeSong].url;
    this.myPlayer.nativeElement.currentTime = 0;
    this.myPlayer.nativeElement.play();
    console.log('Button Action: next. Playing song number ' + this.activeSong);
  }
  songHasEnded(){
    //var myPlayer:any = document.getElementById("audioPlayer");
    this.playMode='playing';
    this.activeSong+=1;
    if (this.activeSong==this.songs.length){
      this.activeSong=0;
    }
    this.myPlayer.nativeElement.src = this.songs[this.activeSong].url;
    this.myPlayer.nativeElement.currentTime = 0;
    this.myPlayer.nativeElement.play();
    console.log('Song has ended. Progressing to next song. ' + this.activeSong);
  }
  changeSong(toSong: number){
    this.playMode='playing';
    this.myPlayer.nativeElement.currentTime = 0;
    this.activeSong=toSong;
    this.myPlayer.nativeElement.src = this.songs[this.activeSong].url;
    this.myPlayer.nativeElement.play();
  }
  progressBarClicked(mouse: any){ // I would have wanted to use MouseEvent, but that does not know its properties and give compilation errors
    var percentPlayed: number;
    var progressBarWidth: number;
    console.log('Progressbar was clicked');
    console.log(mouse);
    progressBarWidth=mouse.target.parentNode.offsetWidth;
    if (mouse.target.className=='progress'){
      progressBarWidth=mouse.target.offsetWidth;
    }
    percentPlayed=(mouse.pageX-mouse.target.offsetLeft)/progressBarWidth *100
    this.progress=percentPlayed + '%';
    this.myPlayer.nativeElement.currentTime=this.myPlayer.nativeElement.duration * percentPlayed / 100 ;
  }
}

// export interface song {
//     id: number,
//     title: string,
//     url: string
// };
