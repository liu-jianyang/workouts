import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent }  from './app.component';
import { ExerciseComponent } from './exercise.component';
import { ExerciseDetailComponent } from './exercise-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ExerciseComponent,
    ExerciseDetailComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }