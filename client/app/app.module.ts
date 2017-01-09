import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }       from './app.routing';

import { HeroesComponent }      from './components/heroes/heroes.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { HeroDetailComponent }  from './components/heroDetail/hero-detail.component';

import { HeroService }  from './services/hero.service';

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
    HeroesComponent,
    DashboardComponent,
    HeroDetailComponent,
    ExerciseComponent,
    ExerciseGridComponent,
    CreditsComponent,
    UpdatesComponent,
    HttpComponent
  ],
  providers: [
    HeroService,
    ExercisesService,
    NameMappingService,
    UpdatesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }