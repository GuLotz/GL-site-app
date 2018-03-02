import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { routingComponents, appRouting} from './routing/app.routing';

import { navigationComponent }  from './navigation/app.navigationComponent';
import { musicComponent }  from './music/app.musicComponent';
import { meMyselfAndIComponent }  from './meMyselfAndI/app.meMyselfAndIComponent';
import { imprintComponent }  from './imprint/app.imprintComponent';
import { homeComponent }  from './home/app.homeComponent';
import { mp3player } from './music/mp3player/mp3player';

import { headerComponent }  from './header/app.headerComponent';
import { contentComponent }  from './content/app.contentComponent';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRouting,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [ AppComponent,
                  routingComponents,
                  navigationComponent,
                  headerComponent,
                  homeComponent,
                  contentComponent,
                  musicComponent,
                  meMyselfAndIComponent,
                  imprintComponent,
                  mp3player
                ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
