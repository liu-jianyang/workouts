import { Component, Input } from '@angular/core';

@Component({
  selector: 'exercise-component',
  templateUrl: 'app/exercise.component.html',
  styleUrls: ['app/exercise.component.css']
})

  

export class ExerciseComponent {
  private _exercise = {};
  private showPrerequisites = false;
  @Input()
  set exercise(exercise) {
    this._exercise = exercise;
    this._exercise.maxPoints = 1;
    this._exercise.currentPoints = 0;
    this.showPrerequisites = exercise.prerequisites ? true : false;
  };

  get exercise() { return this._exercise; };

  onMouseOver(exercise) {
    console.log('hi:');
  };

  onClick(event) {
    if (event.button === 0 && this._exercise.currentPoints < this._exercise.maxPoints) {
      this._exercise.currentPoints++;
    } else if (event.button === 2 && this._exercise.currentPoints > 0) {
      this._exercise.currentPoints--;
    }
  };
}