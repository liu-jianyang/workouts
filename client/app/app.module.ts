import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';

//Used to create fake backend
// import { fakeBackendProvider } from './mock/index';
// import { MockBackend, MockConnection } from '@angular/http/testing';
// import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }       from './app.routing';

import { ExerciseComponent } from './components/exercise/index';
import { ExerciseGridComponent } from './components/grid/index';
import { CreditsComponent } from './components/credits/index';
import { UpdatesComponent } from './components/updates/index';
import { HttpComponent } from './components/http/index';
import { LoginComponent } from './components/login/index';
import { RegisterComponent } from './components/register/index';
import { RoutinesComponent, RoutineDetailComponent } from './components/routines/index';

import { ExercisesService,
         NameMappingService,
         UpdatesService,
         AuthenticationService,
         UserService,
         RoutinesService,
         AuthenticationResolver,
         ExerciseGridResolver } from './services/index';

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
    HttpComponent,
    LoginComponent,
    RegisterComponent,
    RoutinesComponent,
    RoutineDetailComponent
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' },
    ExercisesService,
    NameMappingService,
    UpdatesService,
    AuthenticationService,
    UserService,
    RoutinesService,
    AuthenticationResolver,
    ExerciseGridResolver

    // providers used to create fake backend
    // fakeBackendProvider,
    // MockBackend,
    // BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }