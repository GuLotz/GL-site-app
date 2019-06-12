import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioExperimentsComponent } from './audio-experiments.component';

describe('AudioExperimentsComponent', () => {
  let component: AudioExperimentsComponent;
  let fixture: ComponentFixture<AudioExperimentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioExperimentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioExperimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
