import { Routes, RouterModule } from '@angular/router';

import { ExerciseGridComponent } from './components/grid/exercise-grid.component';
import { UpdatesComponent } from './components/updates/updates.component';
import { CreditsComponent } from './components/credits/credits.component';
import { HttpComponent } from './components/http/http.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'exercises',
    pathMatch: 'full'
  },
  { path: 'exercises', component: ExerciseGridComponent },
  { path: 'updates', component: UpdatesComponent },
  { path: 'credits', component: CreditsComponent },
  { path: '**', component: HttpComponent }
];

export const routing = RouterModule.forRoot(appRoutes);