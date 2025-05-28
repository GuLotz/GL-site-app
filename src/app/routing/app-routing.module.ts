import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { homeComponent } from '../home/app.homeComponent';
import { audioExperimentsComponent } from '../audio-experiments/audio-experiments.component';
import { imprintComponent } from '../imprint/app.imprintComponent';
import { meMyselfAndIComponent } from '../meMyselfAndI/app.meMyselfAndIComponent';
import { musicComponent } from '../music/app.musicComponent';
import { pageNotFoundComponent } from '../pageNotFound/app.pageNotFoundComponent';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', data: [{ headerImageURL: '' }, { tabTitle: '' }] },
  { path: 'home', component: homeComponent, data: [{ headerImageURL: 'HeaderPicture1.jpg' }, { tabTitle: 'Home' }] },
  { path: 'music', component: musicComponent, data: [{ headerImageURL: 'HeaderPicture3.jpg' }, { tabTitle: 'Music' }] },
  { path: 'meMyselfAndI', component: meMyselfAndIComponent, data: [{ headerImageURL: 'HeaderPicture4.jpg' }, { tabTitle: 'Me, Myself and I' }] },
  { path: 'imprint', component: imprintComponent, data: [{ headerImageURL: 'HeaderPicture2.jpg' }, { tabTitle: 'Imprint' }] },
  //{ path: 'Experimental', component: audioExperimentsComponent, data: [{ headerImageURL: 'HeaderPicture2.jpg' }, { tabTitle: 'Experiments' }] },
  { path: '**', component: pageNotFoundComponent, data: [{ headerImageURL: 'HeaderPicture4.jpg' }, { tabTitle: '' }] }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
