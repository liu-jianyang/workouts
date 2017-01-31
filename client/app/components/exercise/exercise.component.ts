import { Component, Input } from '@angular/core';
import { ExercisesService } from '../../services/index';

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
    if (svg.getAttribute('height') <  endY) {
      svg.setAttribute('height', endY);
    }
    if (svg.getAttribute('width' ) < (startX + stroke) ) {
      svg.setAttribute('width', (startX + stroke));
    }
    if (svg.getAttribute('width' ) < (endX   + stroke) ) {
      svg.setAttribute('width', (endX   + stroke));
    }
    path.setAttribute('d',  'M'  + startX + ' ' + startY +
                            ' L' + endX + ' ' + endY );
}

function connectElements(exercise, startElem, endElem) {
  var svgContainer = document.getElementById('svg-container');
  var svg = document.getElementById('svg');
  var path = document.getElementById('path');
  var newPath = path.cloneNode(true);
  newPath.id = 'path';
  svg.appendChild(newPath);

  // if first element is lower than the second, swap!
  if (startElem.offsetTop > endElem.offsetTop) {
    var temp = startElem;
    startElem = endElem;
    endElem = temp;
  }

  exercise.paths.push({path: newPath, startElem: startElem});

  // get (top, left) corner coordinates of the svg container   
  var svgTop  = svgContainer.offsetTop;
  var svgLeft = svgContainer.offsetLeft;

  // calculate path's start (x,y)  coords
  // we want the x coordinate to visually result in the element's mid point
  var startX = startElem.offsetLeft + 0.5 * startElem.offsetWidth - svgLeft;    // x = left offset + 0.5*width - svg's left offset
  var startY = startElem.offsetTop + 0.5 * startElem.offsetHeight - svgTop;        // y = top offset + height - svg's top offset

      // calculate path's end (x,y) coords
  var endX = endElem.offsetLeft + 0.5 * endElem.offsetWidth - svgLeft;
  var endY = endElem.offsetTop + 0.5 * endElem.offsetHeight - svgTop;

  // call function for drawing the path
  drawPath(svg, newPath, startX, startY, endX, endY);
}



function drawConnectors(exercise, exercisesToConnect) {
  var element = document.getElementById(exercise.id);
  // connect all the paths you want!
  exercisesToConnect.forEach(function(e) {
    let elementToConnect = document.getElementById(e);
    connectElements(exercise, elementToConnect, element);
  });
}

function movePopup(popup, element) {
  popup.style.top = (0 - (popup.clientHeight - element.clientHeight)/2) + 'px';
  popup.style.left = element.clientWidth - 30 + 'px';
}

@Component({
  selector: 'exercise-component',
  templateUrl: 'app/components/exercise/exercise.component.html',
  styleUrls: ['app/components/exercise/exercise.component.css']
})

export class ExerciseComponent {
  private _exercise = {};
  private _prereqs = [];
  private exerciseInfo;
  private errorMessage;
  private showPrerequisites = false;
  private completedExercise = false;
  private canStartExercise = false;
  private total = 0;
  private hasDrawnLines = false;
  private popupUpdated = false;
  private popup;
  private element;
  private mouseOver = false;
  constructor (private exercisesService: ExercisesService) {};

  getExercise(eid) {
    this.exercisesService.getExercise(eid)
      .subscribe(
        exercise => this.exerciseInfo = exercise,
        error =>  this.errorMessage = <any>error);
  };
  @Input()
  set exercise(exercise) {
    this._exercise = exercise;
    this._exercise.maxPoints = 1;
    this._exercise.currentPoints = 0;
    this._exercise.paths = [];
    this._exercise.prerequisites = exercise.prerequisites || [];
  };

  get exercise() { return this._exercise; };

  @Input()
  set prereqs(prereqs) {
    if (!prereqs || prereqs.length === 0) {
      this.canStartExercise = true;
      this.showPrerequisites = false;
    } else {
      this._prereqs = prereqs;
      var currentTotal = 0;
      prereqs.forEach(function(prereq) {
        currentTotal += prereq.maxPoints;
      });
      this.total = currentTotal;
      this.showPrerequisites = true;
    }
  }

  @Input() title: string;

  ngAfterViewInit() {
    if (this._exercise.id === 'empty') {
      return;
    }
    if (this._prereqs.length > 0 && !this.hasDrawnLines) {
      let ids = [];
      this._prereqs.forEach(function(prereq) {
        ids.push(prereq.id);
      });
      drawConnectors(this._exercise, ids);
      this.hasDrawnLines = true;
    }
  }

  ngDoCheck() {
    if (this._prereqs.length > 0 && JSON.stringify(this._prereqs) !== this.oldPoints) {
      this.checkPrereqsComplete();
      this.updatePaths();
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

  onMouseOver() {
    event.preventDefault();
    if (this.mouseOver) {
      return;
    }
    this.mouseOver = true;
    if (!this.popupUpdated) {
      this.element = document.getElementById(this._exercise.id);
      this.popup = this.element.childNodes[0].children[1];
      movePopup(this.popup, this.element);
      this.getExercise(this._exercise.id);
      this.popupUpdated = true;
    }
    
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (this.element.getBoundingClientRect().right + this.popup.clientWidth > w) {
      this.popup.style.left = 0 - this.popup.clientWidth - 5 + 'px';
    } else {
      this.popup.style.left = this.element.clientWidth - 30 + 'px';
    }
    
    this._exercise.paths.forEach(function(e) {
      var path = e.path;
      if (path.getAttribute('stroke') !== 'gold') {
        path.setAttribute('stroke', 'yellow');
      }
    });
  };

  onMouseLeave() {
    event.preventDefault();
    this.mouseOver = false;
    this._exercise.paths.forEach(function(e) {
      var path = e.path;
      if (path.getAttribute('stroke') !== 'gold') {
        path.setAttribute('stroke', 'black');
      }
    });
  }

  checkPrereqsComplete() {
    var sum = 0;
    this._prereqs.forEach(function(prereq) {
      sum += prereq.currentPoints;
    });
    this.canStartExercise = (sum === this.total) ? true : false;
  };

  updatePaths() {
    this._exercise.paths.forEach(function(e) {
      var path = e.path,
          startElem = e.startElem;
      if (startElem.children[0].className.indexOf('exercise-completed') !== -1) {
        path.setAttribute('stroke', 'gold');
      } else {
        path.setAttribute('stroke', 'black');
      }
    });
  }


}