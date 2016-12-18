import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { ExerciseDetailComponent } from './exercise-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    ExerciseDetailComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }