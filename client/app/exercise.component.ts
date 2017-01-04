import { Component, Input } from '@angular/core';
import * as _ from 'underscore';

//helper functions, it turned out chrome doesn't support Math.sgn() 
function signum(x) {
    return (x < 0) ? -1 : 1;
}
function absolute(x) {
    return (x < 0) ? -x : x;
}

function drawPath(svg, path, startX, startY, endX, endY) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    var stroke =  parseFloat(path.getAttribute('stroke-width'));
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.getAttribute('height') <  endY)                 svg.setAttribute('height', endY);
    if (svg.getAttribute('width' ) < (startX + stroke) )    svg.setAttribute('width', (startX + stroke));
    if (svg.getAttribute('width' ) < (endX   + stroke) )    svg.setAttribute('width', (endX   + stroke));
    path.setAttribute('d',  'M'  + startX + ' ' + startY +
                            ' L' + endX + ' ' + endY );
}

function connectElements(startElem, endElem, counter) {
  var svgContainer = document.getElementById('svgContainer');
  var svg = document.getElementById('svg');
  var path = document.getElementById('path');
  var newPath = path.cloneNode(true);
  newPath.id = 'path_' + counter;
  svg.appendChild(newPath);

  // if first element is lower than the second, swap!
  if(startElem.offsetTop > endElem.offsetTop){
      var temp = startElem;
      startElem = endElem;
      endElem = temp;
  }

  // get (top, left) corner coordinates of the svg container   
  var svgTop  = svgContainer.offsetTop;
  var svgLeft = svgContainer.offsetLeft;

  // calculate path's start (x,y)  coords
  // we want the x coordinate to visually result in the element's mid point
  var startX = startElem.offsetLeft + 0.5*startElem.offsetWidth - svgLeft;    // x = left offset + 0.5*width - svg's left offset
  var startY = startElem.offsetTop + 0.5*startElem.offsetHeight - svgTop;        // y = top offset + height - svg's top offset

      // calculate path's end (x,y) coords
  var endX = endElem.offsetLeft + 0.5*endElem.offsetWidth - svgLeft;
  var endY = endElem.offsetTop + 0.5*endElem.offsetHeight - svgTop;

  // call function for drawing the path
  drawPath(svg, newPath, startX, startY, endX, endY);

}



function drawConnectors(exercise, exercisesToConnect, counter) {
  var element = document.getElementById(exercise);
  // connect all the paths you want!
  exercisesToConnect.forEach(function(e) {
    let elementToConnect = document.getElementById(e);
    connectElements(elementToConnect, element, counter++);
  });
}

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
  private hasDrawnLines = false;
  private counter = 0;

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

  @Input() title: string;

  ngAfterViewInit() {
    if (this._prereqs.length > 0 && !this.hasDrawnLines) {
      drawConnectors(this._exercise.id, _.pluck(this._prereqs, 'id'), this.counter);
      this.hasDrawnLines = true;
    }
  }

  ngDoCheck() {
    if (this._prereqs.length > 0 && JSON.stringify(this._prereqs) !== this.oldPoints) {
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