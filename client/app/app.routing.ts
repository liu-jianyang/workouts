import { Routes, RouterModule } from '@angular/router';

import { ExerciseGridComponent } from './components/grid/index';
import { UpdatesComponent } from './components/updates/index';
import { CreditsComponent } from './components/credits/index';
import { HttpComponent } from './components/http/index';
import { LoginComponent } from './components/login/index';
import { RegisterComponent } from './components/register/index';
import { RoutinesComponent } from './components/routines/index';

import { ExerciseGridResolver, AuthenticationResolver } from './services/index';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'exercises',
    pathMatch: 'full'
  },
  { path: 'exercises', component: ExerciseGridComponent, resolve: {userExercises: ExerciseGridResolver} },
  { path: 'routines', component: RoutinesComponent },
  { path: 'updates', component: UpdatesComponent },
  { path: 'credits', component: CreditsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: HttpComponent }
];

export const routing = RouterModule.forRoot(appRoutes);