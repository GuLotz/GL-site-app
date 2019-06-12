import { Component, OnInit } from '@angular/core';
import { swipe } from '../app.component';

@Component({
  selector: 'app-audio-experiments',
  templateUrl: './audio-experiments.component.html',
  styleUrls: ['./audio-experiments.component.css']
})
export class audioExperimentsComponent implements OnInit {
  swipe:string;
  constructor() { }

  ngOnInit() {
    this.swipe=swipe;
  }

}
