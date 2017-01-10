import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';

import { AppComponent }  from './app.component';
import { routing }       from './app.routing';

import { ExerciseComponent } from './components/exercise/exercise.component';
import { ExerciseGridComponent } from './components/grid/exercise-grid.component';
import { CreditsComponent } from './components/credits/credits.component';
import { UpdatesComponent } from './components/updates/updates.component';
import { HttpComponent } from './components/http/http.component';

import { ExercisesService } from './services/exercises.service';
import { NameMappingService } from './services/name-mapping.service';
import { UpdatesService } from './services/updates.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
    ],
  declarations: [
    AppComponent,
    ExerciseComponent,
    ExerciseGridComponent,
    CreditsComponent,
    UpdatesComponent,
    HttpComponent
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' },
    ExercisesService,
    NameMappingService,
    UpdatesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }