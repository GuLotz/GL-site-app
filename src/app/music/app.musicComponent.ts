import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { song } from './song.model';
import { resolve } from 'dns';

@Component({
    selector: 'app-music',
    templateUrl: 'music.html',
    standalone: false
})

export class musicComponent implements OnInit {
  @ViewChild('audioPlayer', { static: true }) myPlayer;

  playMode:string ='pausing';

  progress:string ='0%';

  songs: Array<song> //= [new song(1, 'Guitar Rock', 'assets/songs/GunAudio5b.mp3', "01:53", 0)];

  activeSong: number;
  sub: any;

  constructor(){
    this.activeSong = 0;
  }

  //async ngOnInit() {
  //  this.readSongList();
  //}

  //readSongList() {
  //  return new Promise((resolve, reject) => {
  //    fetch('assets/songs/songs.json').then(res => res.json()).then(data => {
  //      this.songs = data;
  //      console.log("song list fetched");
  //      //console.log(this.songs)
  //    }).then(() => {
  //      if (this.activeSong >= this.songs.length) {
  //        this.activeSong = 0;
  //      }
  //      resolve(true);
  //    })
  //  })
  //}

  async ngOnInit() {
    this.updateSongList()
  }

  async updateSongList() {
    this.getSongList().then(data => this.songs = data).then(() => { for (let i = 0; i < this.songs.length; i++){this.getSongLikes(this.songs[i].id).then(likes=>this.songs[i].likes=likes) } });
  }

  getSongList():Promise<song[]> {
    return new Promise((resolve, reject) => {
      fetch('assets/songs/songs.json')
        .then(res => resolve(res.json()))
        .catch(error => reject(error))
    })
  }

  getSongLikes(song: number):Promise<number> {
    return new Promise((resolve, reject) => {
      fetch('assets/php/api.php?SongID=' + song).then(res => resolve(res.json()))
    })
  }

  ngAfterViewInit(){
    this.myPlayer.nativeElement.onended = () => this.songHasEnded();

    this.myPlayer.nativeElement.ontimeupdate=()=>{
      this.progress=this.myPlayer.nativeElement.currentTime/this.myPlayer.nativeElement.duration*100 + "%";
      //console.log('timeupdate: progress: ' + this.progress);
    }
  }

  //playAudio(myPlayer: HTMLAudioElement){
  playAudio() {
      if (this.playMode === 'playing') {
        this.playMode = 'pausing';
        this.myPlayer.nativeElement.pause();
        console.log('Button Action: pause');
      }
      else {
        if (this.playMode === 'pausing') {
          this.updateSongList().then(() => {
            this.playMode = 'playing';
            this.myPlayer.nativeElement.play();
            console.log('Button Action: play song number ' + this.activeSong + " : " + this.songs[this.activeSong].title);
          })
        }
        else {
          console.log('wrong content of variable playmode:' + this.playMode);
        }
      }
  }

  stopAudio(){
    //var myPlayer:any = document.getElementById("audioPlayer");
    this.playMode = 'pausing';
    this.myPlayer.nativeElement.pause();
    this.myPlayer.nativeElement.currentTime = 0;
    console.log('Button Action: stop');
  }

  goToPreviousSong(){
    //var myPlayer:any = document.getElementById("audioPlayer");
    this.updateSongList().then(() => {
      this.playMode = 'playing';
      this.activeSong -= 1;

      if (this.activeSong == -1) {
        this.activeSong = this.songs.length - 1;
      }
      this.myPlayer.nativeElement.src = this.songs[this.activeSong].path;
      this.myPlayer.nativeElement.currentTime = 0;
      this.myPlayer.nativeElement.play();
      console.log('Button Action: previous. Playing song number ' + this.activeSong);
    })
  }
  goToNextSong() {
    //var myPlayer:any = document.getElementById("audioPlayer");
    this.updateSongList().then(() => {
      this.playMode = 'playing';
      this.activeSong += 1;
      if (this.activeSong == this.songs.length) {
        this.activeSong = 0;
      }
      this.myPlayer.nativeElement.src = this.songs[this.activeSong].path;
      this.myPlayer.nativeElement.currentTime = 0;
      this.myPlayer.nativeElement.play();
      console.log('Button Action: next. Playing song number ' + this.activeSong);
    })
  }

  songHasEnded(){
    //var myPlayer:any = document.getElementById("audioPlayer");
    this.updateSongList().then(() => {
      this.playMode = 'playing';
      this.activeSong += 1;
      if (this.activeSong == this.songs.length) {
        this.activeSong = 0;
      }
      this.myPlayer.nativeElement.src = this.songs[this.activeSong].path;
      this.myPlayer.nativeElement.currentTime = 0;
      this.myPlayer.nativeElement.play();
      console.log('Song has ended 3. Progressing to next song. ' + this.activeSong);
    })
  }

  changeSong(toSong: number) {
    this.updateSongList().then(() => {
      this.playMode = 'playing';
      this.myPlayer.nativeElement.currentTime = 0;
      this.activeSong = toSong;
      this.myPlayer.nativeElement.src = this.songs[this.activeSong].path;
      this.myPlayer.nativeElement.play();
    })
  }

  progressBarClicked(mouse: any) { // I would have wanted to use MouseEvent, but that does not know its properties and gives compilation errors
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

