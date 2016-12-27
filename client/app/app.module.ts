import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { ExerciseComponent } from './exercise.component';
import { ExerciseGridComponent } from './exercise-grid.component';
import { ExerciseDetailComponent } from './exercise-detail.component';
import { ExercisesService } from './exercises.service';
import { NameMappingService } from './name-mapping.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ExerciseComponent,
    ExerciseGridComponent,
    ExerciseDetailComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [ ExercisesService, NameMappingService ]
})
export class AppModule { }