import {RouterModule, Routes} from '@angular/router';

import {homeComponent} from '../home/app.homeComponent';
import {imprintComponent} from '../imprint/app.imprintComponent';
import {musicComponent} from '../music/app.musicComponent';
import {meMyselfAndIComponent} from '../meMyselfAndI/app.meMyselfAndIComponent';
import {pageNotFoundComponent} from '../pageNotFound/app.pageNotFoundComponent';
import {audioExperimentsComponent} from '../audio-experiments/audio-experiments.component'

// Note that I put in navigationComponent.ts that the first and last path should not get a tab!
export const appRoutes: Routes=[
  {path:'', redirectTo: '/home', pathMatch:'full' , data:[{ headerImageURL: ''},{tabTitle:''}]},
  {path:'home', component: homeComponent, data:[{ headerImageURL: 'HeaderPicture1.jpg'}, {tabTitle: 'Home' }]},
  {path:'music', component: musicComponent, data: [{ headerImageURL: 'HeaderPicture3.jpg' },{ tabTitle:'Music'}]},
  {path:'meMyselfAndI', component: meMyselfAndIComponent, data: [{ headerImageURL: 'HeaderPicture4.jpg'},{tabTitle:'Me, Myself and I' }]},
  {path:'imprint', component: imprintComponent, data: [{ headerImageURL: 'HeaderPicture2.jpg'}, {tabTitle:'Imprint'} ]},
  {path:'Experimental', component: audioExperimentsComponent, data: [{ headerImageURL: 'HeaderPicture2.jpg'}, {tabTitle:'Experiments'} ]},
  {path:'**', component: pageNotFoundComponent, data: [{ headerImageURL: 'HeaderPicture4.jpg'},{tabTitle:'' }]}
];

export const appRouting = RouterModule.forRoot(appRoutes);

export const routingComponents= [
  homeComponent,
  meMyselfAndIComponent,
  musicComponent,
  imprintComponent,
  pageNotFoundComponent
];
