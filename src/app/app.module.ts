import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { musicComponent }  from './music/app.musicComponent';
import { meMyselfAndIComponent }  from './meMyselfAndI/app.meMyselfAndIComponent';
import { imprintComponent }  from './imprint/app.imprintComponent';
import { homeComponent }  from './home/app.homeComponent';

import { headerComponent }  from './header/app.headerComponent';
import { contentComponent }  from './content/app.contentComponent';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { audioExperimentsComponent } from './audio-experiments/audio-experiments.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { navigationComponent } from './navigation/app.navigationComponent';

//        musicComponent is standalone now (otherwise would need to put it into declarations)

@NgModule({
  declarations: [
        AppComponent,
        headerComponent,
        homeComponent,
        contentComponent,
        meMyselfAndIComponent,
        imprintComponent,
        audioExperimentsComponent
    ],
  bootstrap: [AppComponent],
  imports: [BrowserModule,
        navigationComponent,
        HammerModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        NgbModule,
        AppRoutingModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
