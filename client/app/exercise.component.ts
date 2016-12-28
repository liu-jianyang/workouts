import { Component, Input } from '@angular/core';

@Component({
  selector: 'exercise-component',
  templateUrl: 'app/exercise.component.html',
  styleUrls: ['app/exercise.component.css']
})

export class ExerciseComponent {
  private _exercise = {};
  private _prereqs = [];
  private showPrerequisites = false;
  private completedExercise = false;
  private canStartExercise = false;
  private total = 0;

  @Input()
  set exercise(exercise) {
    this._exercise = exercise;
    this._exercise.maxPoints = 1;
    this._exercise.currentPoints = 0;
  };

  get exercise() { return this._exercise; };

  @Input()
  set prereqs(prereqs) {
    if (!prereqs || prereqs.length === 0) {
      this.canStartExercise = true;
      this.showPrerequisites = false;
    } else {
      this._prereqs = prereqs;
      this.total = _.reduce(prereqs, function(memo, prereq){ return memo + prereq.maxPoints; }, 0);
      this.showPrerequisites = true;
    }
  }

  ngDoCheck() {
    if (this._prereqs.length > 0 && JSON.stringify(this._prereqs) !== this.oldPoints) {
      console.log('checked:', this._prereqs);
      this.checkPrereqsComplete();
      this.oldPoints = JSON.stringify(this._prereqs);
    }
  }

  onClick(event) {
    event.preventDefault();
    if (!this.canStartExercise) {
      return;
    }
    if (event.button === 0 && this._exercise.currentPoints < this._exercise.maxPoints) {
      this._exercise.currentPoints++;
    } else if (event.button === 2 && this._exercise.currentPoints > 0) {
      this._exercise.currentPoints--;
    }
    if (this._exercise.currentPoints === this._exercise.maxPoints) {
      this._exercise.completedExercise = this.completedExercise = true;
    } else {
      this._exercise.completedExercise = this.completedExercise = false;
    }
  };

  checkPrereqsComplete() {
    let sum = _.reduce(this._prereqs, function(memo, prereq){ return memo + prereq.currentPoints; }, 0);
    this.canStartExercise = (sum === this.total) ? true : false;
  };
}