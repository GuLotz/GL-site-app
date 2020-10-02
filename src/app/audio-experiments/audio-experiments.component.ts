import { Component, OnInit } from '@angular/core';

//import { swipe } from '../app.component';

@Component({
  selector: 'app-audio-experiments',
  templateUrl: './audio-experiments.component.html',
  styleUrls: ['./audio-experiments.component.css']
})

export class audioExperimentsComponent implements OnInit {
  panDirection: string;
  //swipe: string;
  constructor() {
  }

  ngOnInit() {
    this.panDirection="No Pan so far"
  }

  //Start of Experiment to try and get swipe working
  onPanUp(action){
    this.panDirection="Up"
  }
  onPanDown(action){
    this.panDirection="Down"
  }
  //End of Experiment

}
