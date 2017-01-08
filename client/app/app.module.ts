import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { ExerciseComponent } from './exercise.component';
import { ExerciseGridComponent } from './exercise-grid.component';
import { ExerciseDetailComponent } from './exercise-detail.component';
import { CreditsComponent } from './credits.component';
import { UpdatesComponent } from './updates.component';
import { HttpComponent } from './http.component';

import { ExercisesService } from './exercises.service';
import { NameMappingService } from './name-mapping.service';
import { UpdatesService } from './updates.service';

import { AppRoutes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(AppRoutes)
  ],
  declarations: [
    AppComponent,
    ExerciseComponent,
    ExerciseGridComponent,
    ExerciseDetailComponent,
    CreditsComponent,
    UpdatesComponent,
    HttpComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [ ExercisesService, NameMappingService, UpdatesService ]
})
export class AppModule { }