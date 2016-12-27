import { Component, Input } from '@angular/core';
import { ExercisesService } from './exercises.service';
import { NameMappingService } from './name-mapping.service';

const LEVELS: Number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10
]

@Component({
  selector: 'exercise-grid',
  templateUrl: 'app/exercise-grid.component.html'
})

export class ExerciseGridComponent {
  exerciseLists: any[];
  nameMapping: any[];
  errorMessage: string;
  mode = 'Observable';
  constructor (private exercisesService: ExercisesService, private nameMappingService: NameMappingService) {};
  ngOnInit() { 
    this.getExercises();
    this.getNameMapping();
  };
  getExercises() {
    this.exercisesService.getExercises()
      .subscribe(
        exercises => this.exerciseLists = exercises,
        error =>  this.errorMessage = <any>error);
  };
  getNameMapping() {
    this.nameMappingService.getNameMapping()
      .subscribe(
        nameMapping => this.nameMapping = nameMapping,
        error =>  this.errorMessage = <any>error);
  };
}