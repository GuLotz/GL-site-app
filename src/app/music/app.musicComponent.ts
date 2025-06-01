import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { song } from './song.model';

import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgIf, NgClass } from '@angular/common';
import { v4 as uuid } from 'uuid';

import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-music',
  templateUrl: 'music.html',
  styleUrl: 'app.musicComponent.scss',
  standalone: true,
  imports: [MatCardModule, MatSliderModule, MatInputModule, MatIconModule, FormsModule, NgIf, NgClass, MatTableModule, MatSortModule],
})

export class musicComponent implements OnInit, AfterViewInit {

  @ViewChild('audioPlayer', { static: true }) myPlayer;

  sliderValue: number;

  playMode: string = 'pausing';

  songs: Array<song> = [new song(1, "74f9edf1-1229-4132-8668-27f753dac086", 'Guitar Rock', 'assets/songs/GunAudio5b.mp3', "01:53", 0),
                        new song(2, "084daa22-dd4f-42ff-9711-f6dc5db29498", 'Gritty Organ', 'assets/songs/QS8.2_018_Bandlabs.mp3', "02:24", 1)];

  activeSong: number;
  activeSongDuration: string | undefined;
  activeSongPosition: string | undefined;
  sub: any;
  renderedData: song[];

  constructor() {
    this.activeSong = 0;
    this.activeSongPosition = "00:00";
    this.activeSongDuration = undefined;
    this.sliderValue = 0;
    this.dataSource = new MatTableDataSource(this.songs);
  }

  async ngOnInit() {
    this.updateSongList();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.connect().subscribe(d => this.renderedData = d);
    this.scrollToActiveSong();
    //this.myPlayer.nativeElement.onended = () => this.songHasEnded();
  }

  async updateSongList() {
    this.getSongList().then(data => this.songs = data)
      .then(() => {
        for (let i = 0; i < this.songs.length; i++) {
          this.getSongLikes(this.songs[i].uuid)
          .then(likes => this.songs[i].likes = likes)
        }
      })
      .then(() => {
        this.dataSource = new MatTableDataSource(this.songs);
        this.dataSource.sort = this.sort;
        this.dataSource.connect().subscribe(d => this.renderedData = d);
    })
    //console.log("Called updateSongList");
  }

  async updateSliderValue() {
    this.sliderValue = this.myPlayer.nativeElement.currentTime / this.myPlayer.nativeElement.duration * 100;
    this.updateSongPosition(this.myPlayer.nativeElement.currentTime);
    //console.log("updateSliderValue: " + this.sliderValue)
  }

  onSliderValueChanged(value: number) {
    this.myPlayer.nativeElement.currentTime = value * this.myPlayer.nativeElement.duration / 100;
    //this.updateSongPosition(this.myPlayer.nativeElement.currentTime);
    //console.log("Slider value changed to: " + value + "resulting in song position " + this.myPlayer.nativeElement.currentTime);
  }

  onInputChange(event: Event) {
    console.log("This is emitted as the thumb slides");
    console.log((event.target as HTMLInputElement).value);
    this.updateSongPosition(parseInt((event.target as HTMLInputElement).value) * this.myPlayer.nativeElement.duration / 100);
  }

  getSongList(): Promise<song[]> {
    return new Promise((resolve, reject) => {
      fetch('assets/songs/songs.json')
        .then(res => resolve(res.json()))
        .catch(error => reject(error))
    })
  }

  getSongLikes(song: string): Promise<number> {
    return new Promise((resolve, reject) => {
      fetch('assets/php/api.php?SongID=' + song).then(res => resolve(res.json()))
    })
  }

  playAudio() {
    if (this.playMode === 'playing') {
      this.playMode = 'pausing';
      this.myPlayer.nativeElement.pause();
      this.scrollToActiveSong();
      //console.log('Button Action: pause');
    }
    else {
      if (this.playMode === 'pausing') {
        this.updateSongList().then(() => {
          this.playMode = 'playing';
          this.myPlayer.nativeElement.play();
        }).then(() => {
          this.scrollToActiveSong();
          //console.log('Button Action: play song number ' + this.activeSong + " : " + this.songs[this.activeSong].title);
        })
      }
      else {
        //console.log('Technical Error: Wrong content of variable playmode:' + this.playMode);
      }
    }
  }

  stopAudio() {
    this.playMode = 'pausing';
    this.myPlayer.nativeElement.pause();
    this.myPlayer.nativeElement.currentTime = 0;
    //console.log('Button Action: stop');
  }

  goToPreviousSong() {
    var nextSong: song;
    var positionInSortedList: number;

    this.updateSongList().then(() => {
      positionInSortedList = this.getSongPositionInList(this.songs[this.activeSong].uuid, this.renderedData);
      //console.log("Active song: ", this.activeSong);
      //console.log("Position of active song in sorted table: ", positionInSortedList);
      //console.log("length of list: ", this.renderedData.length);

      if (positionInSortedList == 0 ) {
        nextSong = this.renderedData[this.renderedData.length -1];
      }
      else {
        nextSong = this.renderedData[positionInSortedList - 1];
      }
      this.playMode = 'playing';
      this.activeSong = this.getSongPositionInList(nextSong.uuid, this.songs);

      this.myPlayer.nativeElement.src = this.songs[this.activeSong].path;
      this.myPlayer.nativeElement.currentTime = 0;
    }).then(() => {
      this.myPlayer.nativeElement.play();
      this.scrollToActiveSong()
    }).then(() => {
      //console.log('Button Action: skip back. Playing song number ' + this.activeSong);
    })
  }

  goToNextSong() {
    var nextSong: song;
    var positionInSortedList: number;

    this.updateSongList().then(() => {
      positionInSortedList = this.getSongPositionInList(this.songs[this.activeSong].uuid, this.renderedData);
      //console.log("Active song: ", this.activeSong);
      //console.log("Position of active song in sorted table: ", positionInSortedList);
      //console.log("length of list: ", this.renderedData.length);

      if (positionInSortedList == this.renderedData.length-1) {
        nextSong = this.renderedData[0];
      }
      else {
        nextSong = this.renderedData[positionInSortedList + 1];        
      }
      this.playMode = 'playing';
      this.activeSong = this.getSongPositionInList(nextSong.uuid,this.songs );

      this.myPlayer.nativeElement.src = this.songs[this.activeSong].path;
      this.myPlayer.nativeElement.currentTime = 0;
    }).then(() => {
      this.myPlayer.nativeElement.play();
    }).then(() => {
      this.scrollToActiveSong();
      //console.log('Button Action: skip forward. Playing song number ' + this.activeSong);
    })
  }

  songHasEnded() {
    this.goToNextSong();
    //console.log('Song has ended. Progressing to next song: ' + this.activeSong);
  }

  changeSong(toSong: number) {
    this.updateSongList().then(() => {
      this.playMode = 'playing';
      this.myPlayer.nativeElement.currentTime = 0;
      this.activeSong = toSong;
      this.activeSongPosition = "00:00";
      this.myPlayer.nativeElement.src = this.songs[this.activeSong].path;
      this.myPlayer.nativeElement.play();
      //console.log('Song was changed: ' + this.activeSong);
    })
  }

  updateDuration() {
    var min: number;
    var sec: number;

    min = ~~(this.myPlayer.nativeElement.duration / 60);
    sec = ~~(this.myPlayer.nativeElement.duration % 60);

    this.activeSongDuration = "" + String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
    //console.log("Duration change detected: " + this.activeSongDuration);
  }

  updateSongPosition(position: number) {
    var min: number;
    var sec: number;

    min = ~~(position / 60);
    sec = ~~(position % 60);

    this.activeSongPosition = "" + String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
    //console.log("Position change detected: " + this.activeSongPosition);
  }

  getSongPositionInList(songUUID: string, songList: song[]): number {
    var position: number = -1;
    songList.forEach(
      (song,index) => {
        //console.log("index: ", index, "song.uuid: ", song.uuid, " looking for: ", songUUID, "found? ", song.uuid== songUUID);
        if (song.uuid == songUUID) {
          position = index;
        }
      }
    )
    return position;
  }

  onLike() {
    const userID = this.getOrCreateUserID();
    if (userID == null) {
      throw "No userId available";
    }

    fetch('assets/php/api.php', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 'SongID': this.songs[this.activeSong].uuid , 'UserID': userID})
    })
      .then((reply) => console.log(reply))
  }

  getOrCreateUserID(): null | string {
    if (typeof (Storage) !== "undefined") {
      const storedUser = localStorage.getItem("UserID");
      if (storedUser == null) {
        const newlyGeneratedUserId = uuid();
        localStorage.setItem("UserID", newlyGeneratedUserId);
        return localStorage.getItem("UserID");
      }
      return storedUser
    } else {
      return null
    }
  }

  //Functions for the table
  displayedColumns: string[] = ['id', 'title', 'likes'];
  dataSource: MatTableDataSource<song>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  announceSortChange(e:Event) {
    console.log(e);
    setTimeout(() => { this.scrollToActiveSong() });
  }

  scrollToActiveSong(): void {
    console.log("Tried to scroll to active song: ", this.activeSong+1);
    const rowElement = document.getElementById(`title-` + (this.activeSong + 1));
    console.log("rowElement:", rowElement );
    if (rowElement) {
      rowElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  
}
