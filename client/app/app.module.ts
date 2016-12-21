import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AppComponent }  from './app.component';
import { ExerciseComponent } from './exercise.component';
import { ExerciseDetailComponent } from './exercise-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ExerciseComponent,
    ExerciseDetailComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }