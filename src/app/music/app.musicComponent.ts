import { Component, ViewChild, OnInit } from '@angular/core';
import { song } from './song.model';

import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgFor, NgIf } from '@angular/common';


@Component({
      selector: 'app-music',
  templateUrl: 'music.html',
   styleUrl: 'app.musicComponent.css',
  standalone: true,
  imports: [MatCardModule, MatSliderModule, MatInputModule, MatIconModule, FormsModule, NgIf, NgFor]
})

export class musicComponent implements OnInit {
  @ViewChild('audioPlayer', { static: true }) myPlayer;

  sliderValue: number;

  playMode: string = 'pausing';

  songs: Array<song> = [new song(1, "74f9edf1-1229-4132-8668-27f753dac086", 'Guitar Rock', 'assets/songs/GunAudio5b.mp3', "01:53", 0)];

  activeSong: number;
  activeSongDuration: string | undefined;
  activeSongPosition: number;
  sub: any;

  constructor(){
    this.activeSong = 0;
    this.activeSongPosition = 0;
    this.activeSongDuration = undefined;
    this.sliderValue = 0;
  }

  async ngOnInit() {
    this.updateSongList();
  }

  async updateSongList() {
    this.getSongList().then(data => this.songs = data).then(() => { for (let i = 0; i < this.songs.length; i++){ this.getSongLikes(this.songs[i].id).then(likes => this.songs[i].likes = likes) } });
    console.log("Called updateSongList");
  }

  async updateSliderValue() {
    this.sliderValue = this.myPlayer.nativeElement.currentTime / this.myPlayer.nativeElement.duration * 100;
    //console.log("sliderValue: " + this.sliderValue)
  }

  async sliderValueChanged(value: number) {
    this.myPlayer.nativeElement.currentTime = value * this.myPlayer.nativeElement.duration / 100;
    //console.log("Slider value changed to: " + value)
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
      //console.log('timeupdate: progress: ' + this.progress);
    }

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
          }).then(() => {
            console.log('Button Action: play song number ' + this.activeSong + " : " + this.songs[this.activeSong].title);
          })
        }
        else {
          console.log('wrong content of variable playmode:' + this.playMode);
        }
      }
  }

  stopAudio(){
    this.playMode = 'pausing';
    this.myPlayer.nativeElement.pause();
    this.myPlayer.nativeElement.currentTime = 0;
    console.log('Button Action: stop');
  }

  goToPreviousSong(){
    this.updateSongList().then(() => {
      this.playMode = 'playing';
      this.activeSong -= 1;

      if (this.activeSong == -1) {
        this.activeSong = this.songs.length - 1;
      }
      this.myPlayer.nativeElement.src = this.songs[this.activeSong].path;
      this.myPlayer.nativeElement.currentTime = 0;
    }).then(() => {
      this.myPlayer.nativeElement.play();
    }).then(() => {
      console.log('Button Action: previous. Playing song number ' + this.activeSong);
    })
  }

  goToNextSong() {
    this.updateSongList().then(() => {
      this.playMode = 'playing';
      this.activeSong += 1;
      if (this.activeSong == this.songs.length) {
        this.activeSong = 0;
      }
      this.myPlayer.nativeElement.src = this.songs[this.activeSong].path;
      this.myPlayer.nativeElement.currentTime = 0;
    }).then(() => {
      this.myPlayer.nativeElement.play();
    }).then(() => {
      console.log('Button Action: next. Playing song number ' + this.activeSong);
    })
  }

  songHasEnded(){
    this.updateSongList().then(() => {
      this.playMode = 'playing';
      this.activeSong += 1;
      if (this.activeSong == this.songs.length) {
        this.activeSong = 0;
      }
      this.myPlayer.nativeElement.src = this.songs[this.activeSong].path;
      this.myPlayer.nativeElement.currentTime = 0;
      this.myPlayer.nativeElement.play();
    }).then(() => {
      console.log('Song has ended. Progressing to next song: ' + this.activeSong);
    })
  }

  changeSong(toSong: number) {
    this.updateSongList().then(() => {
      this.playMode = 'playing';
      this.myPlayer.nativeElement.currentTime = 0;
      this.activeSong = toSong;
      this.activeSongPosition = 0;
      this.myPlayer.nativeElement.src = this.songs[this.activeSong].path;
      this.myPlayer.nativeElement.play();
      console.log('Song was changed: ' + this.activeSong);
    })
  }

  updateDuration() {
    var min: number;
    var sec: number;

    min = ~~(this.myPlayer.nativeElement.duration / 60);
    sec = ~~(this.myPlayer.nativeElement.duration % 60);
    
    this.activeSongDuration = "" + String(min).padStart(2, '0') + ":" + (sec < 10 ? "0" : "") + String(sec).padStart(2, '0');
    console.log("Duration change detected: " + this.activeSongDuration);
  }
}

