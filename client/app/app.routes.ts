import { ExerciseGridComponent } from './exercise-grid.component';
import { ExerciseDetailComponent } from './exercise-detail.component';
import { CreditsComponent } from './credits.component';

export const AppRoutes: Routes = [
  { 
    path: '',
    redirectTo: '/exercises',
    pathMatch: 'full'
  },
  { 
    path: 'exercises',
    component: ExerciseGridComponent 
  },
  { 
    path: 'workouts/:id', 
    component: ExerciseDetailComponent 
  },
  { 
    path: 'credits', 
    component: CreditsComponent 
  }
  // { 
  //   path: '**', 
  //   component: PageNotFoundComponent 
  // }
];