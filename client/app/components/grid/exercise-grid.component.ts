import { Component, Input } from '@angular/core';
import { ExercisesService, NameMappingService, UserService } from '../../services/index';

const LEVELS: Number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
];

function resetSvg() {
  // reset svg each time 
  let svg = document.getElementById('svg');
  svg.setAttribute('height', '0');
  svg.setAttribute('width', '0');
}

@Component({
  selector: 'exercise-grid',
  templateUrl: 'app/components/grid/exercise-grid.component.html',
  styleUrls: ['app/components/grid/exercise-grid.component.css']
})

export class ExerciseGridComponent {
  exerciseLists: any[];
  nameMapping = {};
  errorMessage: string;
  mode = 'Observable';
  constructor (
    private exercisesService: ExercisesService, 
    private nameMappingService: NameMappingService,
    private userService: UserService) {};

  ngOnInit() {
    this.getExercises();
    this.getNameMapping();
    this.getUserExercises();
    resetSvg();
  };

  getExercises() {
    this.exercisesService.getExercises()
      .subscribe(
        exercises => this.exerciseLists = exercises,
        error =>  this.errorMessage = <any>error);
  };

  getUserExercises() {
    this.exercisesService.getUserExercises()
      .subscribe(
        userExercises => this.isLoaded = true,
        error =>  this.errorMessage = <any>error);
  };
  getNameMapping() {
    this.nameMappingService.getNameMapping()
      .subscribe(
        nameMapping => this.nameMapping = nameMapping,
        error =>  this.errorMessage = <any>error);
  };
}