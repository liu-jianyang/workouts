import { Routes, RouterModule } from '@angular/router';

import { ExerciseGridComponent } from './components/grid/index';
import { UpdatesComponent } from './components/updates/index';
import { CreditsComponent } from './components/credits/index';
import { HttpComponent } from './components/http/index';
import { LoginComponent } from './components/login/index';
import { RegisterComponent } from './components/register/index';

import { AuthenticationResolver } from './services/index';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'exercises',
    pathMatch: 'full'
  },
  { path: 'exercises', component: ExerciseGridComponent },
  { path: 'updates', component: UpdatesComponent },
  { path: 'credits', component: CreditsComponent },
  { path: 'login', component: LoginComponent, canActivate: [ AuthenticationResolver ] },
  { path: 'register', component: RegisterComponent, canActivate: [ AuthenticationResolver ] },
  { path: '**', component: HttpComponent }
];

export const routing = RouterModule.forRoot(appRoutes);