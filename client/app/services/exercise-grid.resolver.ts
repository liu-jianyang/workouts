import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ExercisesService } from './index';

@Injectable()
export class ExerciseGridResolver implements Resolve<any> {

  constructor(private service: ExercisesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getUserExercises();
  }

}