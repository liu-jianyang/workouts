import { Routes } from '@angular/router';

import { ExerciseGridComponent } from './exercise-grid.component';
import { ExerciseDetailComponent } from './exercise-detail.component';
import { UpdatesComponent } from './updates.component';
import { CreditsComponent } from './credits.component';
import { HttpComponent } from './http.component';

export const AppRoutes: Routes = [
  { 
    path: '',
    redirectTo: '/exercises',
    pathMatch: 'full'
  },
  { path: 'exercises', component: ExerciseGridComponent },
  { path: 'exercises/:id', component: ExerciseDetailComponent },
  // { path: 'updates', component: UpdatesComponent },
  { path: 'credits', component: CreditsComponent },
  { path: '**', component: HttpComponent }
];