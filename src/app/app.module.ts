import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { routingComponents, appRouting} from './routing/app.routing';

import { navigationComponent }  from './navigation/app.navigationComponent';
import { musicComponent }  from './music/app.musicComponent';
import { meMyselfAndIComponent }  from './meMyselfAndI/app.meMyselfAndIComponent';
import { imprintComponent }  from './imprint/app.imprintComponent';
import { homeComponent }  from './home/app.homeComponent';

import { headerComponent }  from './header/app.headerComponent';
import { contentComponent }  from './content/app.contentComponent';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { audioExperimentsComponent } from './audio-experiments/audio-experiments.component';

@NgModule({ declarations: [AppComponent,
        routingComponents,
        navigationComponent,
        headerComponent,
        homeComponent,
        contentComponent,
        musicComponent,
        meMyselfAndIComponent,
        imprintComponent,
        audioExperimentsComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        HammerModule,
        FormsModule,
        appRouting,
        ReactiveFormsModule,
        MatIconModule,
        NgbModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
