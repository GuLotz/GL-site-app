import {RouterModule, Routes} from '@angular/router';

import {homeComponent} from '../home/app.homeComponent';
import {imprintComponent} from '../imprint/app.imprintComponent';
import {musicComponent} from '../music/app.musicComponent';
import {meMyselfAndIComponent} from '../meMyselfAndI/app.meMyselfAndIComponent';
import {pageNotFoundComponent} from '../pageNotFound/app.pageNotFoundComponent';

export const appRoutes: Routes=[
  {path:'', redirectTo: '/home', pathMatch:'full' },
  {path:'home', component: homeComponent, data:[{ headerImageURL: 'HeaderPicture1.jpg' }]},
  {path:'imprint', component: imprintComponent, data: [{ headerImageURL: 'HeaderPicture2.jpg' }]},
  {path:'music', component: musicComponent, data: [{ headerImageURL: 'HeaderPicture3.jpg' }]},
  {path:'meMyselfAndI', component: meMyselfAndIComponent, data: [{ headerImageURL: 'HeaderPicture4.jpg' }]},
  {path:'**', component: pageNotFoundComponent, data: [{ headerImageURL: 'HeaderPicture4.jpg' }]}
];

export const appRouting = RouterModule.forRoot(appRoutes);

export const routingComponents= [
  homeComponent,
  meMyselfAndIComponent,
  musicComponent,
  imprintComponent,
  pageNotFoundComponent
];
