"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
//helper functions, it turned out chrome doesn't support Math.sgn() 
function signum(x) {
    return (x < 0) ? -1 : 1;
}
function absolute(x) {
    return (x < 0) ? -x : x;
}
function drawPath(svg, path, startX, startY, endX, endY) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    var stroke = parseFloat(path.getAttribute('stroke-width'));
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.getAttribute('height') < endY) {
        svg.setAttribute('height', endY);
    }
    if (svg.getAttribute('width') < (startX + stroke)) {
        svg.setAttribute('width', (startX + stroke));
    }
    if (svg.getAttribute('width') < (endX + stroke)) {
        svg.setAttribute('width', (endX + stroke));
    }
    path.setAttribute('d', 'M' + startX + ' ' + startY +
        ' L' + endX + ' ' + endY);
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
    exercise.paths.push({ path: newPath, startElem: startElem });
    // get (top, left) corner coordinates of the svg container   
    var svgTop = svgContainer.offsetTop;
    var svgLeft = svgContainer.offsetLeft;
    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var startX = startElem.offsetLeft + 0.5 * startElem.offsetWidth - svgLeft; // x = left offset + 0.5*width - svg's left offset
    var startY = startElem.offsetTop + 0.5 * startElem.offsetHeight - svgTop; // y = top offset + height - svg's top offset
    // calculate path's end (x,y) coords
    var endX = endElem.offsetLeft + 0.5 * endElem.offsetWidth - svgLeft;
    var endY = endElem.offsetTop + 0.5 * endElem.offsetHeight - svgTop;
    // call function for drawing the path
    drawPath(svg, newPath, startX, startY, endX, endY);
}
function drawConnectors(exercise, exercisesToConnect) {
    var element = document.getElementById(exercise.id);
    // connect all the paths you want!
    exercisesToConnect.forEach(function (e) {
        var elementToConnect = document.getElementById(e);
        connectElements(exercise, elementToConnect, element);
    });
}
function movePopup(exerciseID) {
    var element = document.getElementById(exerciseID);
    var popup = element.childNodes[0].children[1];
    popup.style.top = (0 - popup.clientHeight) + 'px';
    popup.style.left = ((element.clientWidth - popup.clientWidth) / 2) + 'px';
}
var ExerciseComponent = (function () {
    function ExerciseComponent() {
        this._exercise = {};
        this._prereqs = [];
        this.showPrerequisites = false;
        this.completedExercise = false;
        this.canStartExercise = false;
        this.total = 0;
        this.hasDrawnLines = false;
        this.popupUpdated = false;
    }
    Object.defineProperty(ExerciseComponent.prototype, "exercise", {
        get: function () { return this._exercise; },
        set: function (exercise) {
            this._exercise = exercise;
            this._exercise.maxPoints = 1;
            this._exercise.currentPoints = 0;
            this._exercise.paths = [];
            this._exercise.prerequisites = exercise.prerequisites || [];
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(ExerciseComponent.prototype, "prereqs", {
        set: function (prereqs) {
            if (!prereqs || prereqs.length === 0) {
                this.canStartExercise = true;
                this.showPrerequisites = false;
            }
            else {
                this._prereqs = prereqs;
                var currentTotal = 0;
                prereqs.forEach(function (prereq) {
                    currentTotal += prereq.maxPoints;
                });
                this.total = currentTotal;
                this.showPrerequisites = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    ExerciseComponent.prototype.ngAfterViewInit = function () {
        if (this._exercise.id === 'empty') {
            return;
        }
        if (this._prereqs.length > 0 && !this.hasDrawnLines) {
            var ids_1 = [];
            this._prereqs.forEach(function (prereq) {
                ids_1.push(prereq.id);
            });
            drawConnectors(this._exercise, ids_1);
            this.hasDrawnLines = true;
        }
    };
    ExerciseComponent.prototype.ngDoCheck = function () {
        if (this._prereqs.length > 0 && JSON.stringify(this._prereqs) !== this.oldPoints) {
            this.checkPrereqsComplete();
            this.updatePaths();
            this.oldPoints = JSON.stringify(this._prereqs);
        }
    };
    ExerciseComponent.prototype.onClick = function (event) {
        event.preventDefault();
        if (!this.canStartExercise) {
            return;
        }
        if (event.button === 0 && this._exercise.currentPoints < this._exercise.maxPoints) {
            this._exercise.currentPoints++;
        }
        else if (event.button === 2 && this._exercise.currentPoints > 0) {
            this._exercise.currentPoints--;
        }
        if (this._exercise.currentPoints === this._exercise.maxPoints) {
            this._exercise.completedExercise = this.completedExercise = true;
        }
        else {
            this._exercise.completedExercise = this.completedExercise = false;
        }
    };
    ;
    ExerciseComponent.prototype.onMouseOver = function () {
        event.preventDefault();
        if (!this.popupUpdated) {
            movePopup(this._exercise.id);
            this.popupUpdated = true;
        }
        this._exercise.paths.forEach(function (e) {
            var path = e.path;
            if (path.getAttribute('stroke') !== 'gold') {
                path.setAttribute('stroke', 'yellow');
            }
        });
    };
    ;
    ExerciseComponent.prototype.onMouseLeave = function () {
        event.preventDefault();
        this._exercise.paths.forEach(function (e) {
            var path = e.path;
            if (path.getAttribute('stroke') !== 'gold') {
                path.setAttribute('stroke', 'black');
            }
        });
    };
    ExerciseComponent.prototype.checkPrereqsComplete = function () {
        var sum = 0;
        this._prereqs.forEach(function (prereq) {
            sum += prereq.currentPoints;
        });
        this.canStartExercise = (sum === this.total) ? true : false;
    };
    ;
    ExerciseComponent.prototype.updatePaths = function () {
        this._exercise.paths.forEach(function (e) {
            var path = e.path, startElem = e.startElem;
            if (startElem.children[0].className.indexOf('exercise-completed') !== -1) {
                path.setAttribute('stroke', 'gold');
            }
            else {
                path.setAttribute('stroke', 'black');
            }
        });
    };
    return ExerciseComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ExerciseComponent.prototype, "exercise", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ExerciseComponent.prototype, "prereqs", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ExerciseComponent.prototype, "title", void 0);
ExerciseComponent = __decorate([
    core_1.Component({
        selector: 'exercise-component',
        templateUrl: 'app/components/exercise/exercise.component.html',
        styleUrls: ['app/components/exercise/exercise.component.css']
    })
], ExerciseComponent);
exports.ExerciseComponent = ExerciseComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb21wb25lbnRzL2V4ZXJjaXNlL2V4ZXJjaXNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQWlEO0FBRWpELG9FQUFvRTtBQUNwRSxnQkFBZ0IsQ0FBQztJQUNiLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUNELGtCQUFrQixDQUFDO0lBQ2YsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRUQsa0JBQWtCLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSTtJQUNuRCx3R0FBd0c7SUFDeEcsSUFBSSxNQUFNLEdBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUM1RCwyRUFBMkU7SUFDM0UsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBRSxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBRSxDQUFDLENBQUMsQ0FBQztRQUNwRCxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBRSxHQUFHLENBQUMsSUFBSSxHQUFLLE1BQU0sQ0FBRSxDQUFDLENBQUMsQ0FBQztRQUNwRCxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksR0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRyxHQUFHLEdBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFNO1FBQzVCLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBRSxDQUFDO0FBQ3ZELENBQUM7QUFFRCx5QkFBeUIsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPO0lBQ25ELElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDNUQsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsT0FBTyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUM7SUFDcEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV6QixtREFBbUQ7SUFDbkQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLElBQUksR0FBRyxTQUFTLENBQUM7UUFDckIsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUNwQixPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7SUFFM0QsNkRBQTZEO0lBQzdELElBQUksTUFBTSxHQUFJLFlBQVksQ0FBQyxTQUFTLENBQUM7SUFDckMsSUFBSSxPQUFPLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQztJQUV0Qyx1Q0FBdUM7SUFDdkMseUVBQXlFO0lBQ3pFLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLENBQUksa0RBQWtEO0lBQ2hJLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLENBQVEsNkNBQTZDO0lBRTFILG9DQUFvQztJQUN4QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztJQUNwRSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztJQUVuRSxxQ0FBcUM7SUFDckMsUUFBUSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUlELHdCQUF3QixRQUFRLEVBQUUsa0JBQWtCO0lBQ2xELElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELGtDQUFrQztJQUNsQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBUyxDQUFDO1FBQ25DLElBQUksZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRCxlQUFlLENBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELG1CQUFtQixVQUFVO0lBQzNCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEQsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNsRCxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQzVFLENBQUM7QUFRRCxJQUFhLGlCQUFpQjtJQU45QjtRQU9VLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2Qsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBbUgvQixDQUFDO0lBaEhDLHNCQUFJLHVDQUFRO2FBUVosY0FBaUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBUnpDLFVBQWEsUUFBUTtZQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQztRQUM5RCxDQUFDOzs7T0FBQTtJQUFBLENBQUM7SUFFdUMsQ0FBQztJQUcxQyxzQkFBSSxzQ0FBTzthQUFYLFVBQVksT0FBTztZQUNqQixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7WUFDakMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO2dCQUN4QixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBUyxNQUFNO29CQUM3QixZQUFZLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDbkMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDaEMsQ0FBQztRQUNILENBQUM7OztPQUFBO0lBSUQsMkNBQWUsR0FBZjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3BELElBQUksS0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVMsTUFBTTtnQkFDbkMsS0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFHLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDO0lBQ0gsQ0FBQztJQUVELHFDQUFTLEdBQVQ7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakYsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakQsQ0FBQztJQUNILENBQUM7SUFFRCxtQ0FBTyxHQUFQLFVBQVEsS0FBSztRQUNYLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsRixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ2pDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ2pDLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ25FLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUNwRSxDQUFDO0lBQ0gsQ0FBQztJQUFBLENBQUM7SUFFRix1Q0FBVyxHQUFYO1FBQ0UsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdkIsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDM0IsQ0FBQztRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFTLENBQUM7WUFDckMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFBQSxDQUFDO0lBRUYsd0NBQVksR0FBWjtRQUNFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBUyxDQUFDO1lBQ3JDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN2QyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0RBQW9CLEdBQXBCO1FBQ0UsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBUyxNQUFNO1lBQ25DLEdBQUcsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQzlELENBQUM7SUFBQSxDQUFDO0lBRUYsdUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFTLENBQUM7WUFDckMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFDYixTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1QixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3RDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN2QyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBR0gsd0JBQUM7QUFBRCxDQTNIQSxBQTJIQyxJQUFBO0FBaEhDO0lBREMsWUFBSyxFQUFFOzs7aURBT1A7QUFLRDtJQURDLFlBQUssRUFBRTs7O2dEQWNQO0FBRVE7SUFBUixZQUFLLEVBQUU7O2dEQUFlO0FBckNaLGlCQUFpQjtJQU43QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixXQUFXLEVBQUUsaURBQWlEO1FBQzlELFNBQVMsRUFBRSxDQUFDLGdEQUFnRCxDQUFDO0tBQzlELENBQUM7R0FFVyxpQkFBaUIsQ0EySDdCO0FBM0hZLDhDQUFpQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9leGVyY2lzZS9leGVyY2lzZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vL2hlbHBlciBmdW5jdGlvbnMsIGl0IHR1cm5lZCBvdXQgY2hyb21lIGRvZXNuJ3Qgc3VwcG9ydCBNYXRoLnNnbigpIFxyXG5mdW5jdGlvbiBzaWdudW0oeCkge1xyXG4gICAgcmV0dXJuICh4IDwgMCkgPyAtMSA6IDE7XHJcbn1cclxuZnVuY3Rpb24gYWJzb2x1dGUoeCkge1xyXG4gICAgcmV0dXJuICh4IDwgMCkgPyAteCA6IHg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdQYXRoKHN2ZywgcGF0aCwgc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpIHtcclxuICAgIC8vIGdldCB0aGUgcGF0aCdzIHN0cm9rZSB3aWR0aCAoaWYgb25lIHdhbnRlZCB0byBiZSAgcmVhbGx5IHByZWNpemUsIG9uZSBjb3VsZCB1c2UgaGFsZiB0aGUgc3Ryb2tlIHNpemUpXHJcbiAgICB2YXIgc3Ryb2tlID0gIHBhcnNlRmxvYXQocGF0aC5nZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcpKTtcclxuICAgIC8vIGNoZWNrIGlmIHRoZSBzdmcgaXMgYmlnIGVub3VnaCB0byBkcmF3IHRoZSBwYXRoLCBpZiBub3QsIHNldCBoZWlnaC93aWR0aFxyXG4gICAgaWYgKHN2Zy5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpIDwgIGVuZFkpIHtcclxuICAgICAgc3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgZW5kWSk7XHJcbiAgICB9XHJcbiAgICBpZiAoc3ZnLmdldEF0dHJpYnV0ZSgnd2lkdGgnICkgPCAoc3RhcnRYICsgc3Ryb2tlKSApIHtcclxuICAgICAgc3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAoc3RhcnRYICsgc3Ryb2tlKSk7XHJcbiAgICB9XHJcbiAgICBpZiAoc3ZnLmdldEF0dHJpYnV0ZSgnd2lkdGgnICkgPCAoZW5kWCAgICsgc3Ryb2tlKSApIHtcclxuICAgICAgc3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAoZW5kWCAgICsgc3Ryb2tlKSk7XHJcbiAgICB9XHJcbiAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsICAnTScgICsgc3RhcnRYICsgJyAnICsgc3RhcnRZICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgTCcgKyBlbmRYICsgJyAnICsgZW5kWSApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb25uZWN0RWxlbWVudHMoZXhlcmNpc2UsIHN0YXJ0RWxlbSwgZW5kRWxlbSkge1xyXG4gIHZhciBzdmdDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3ZnLWNvbnRhaW5lcicpO1xyXG4gIHZhciBzdmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3ZnJyk7XHJcbiAgdmFyIHBhdGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGF0aCcpO1xyXG4gIHZhciBuZXdQYXRoID0gcGF0aC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgbmV3UGF0aC5pZCA9ICdwYXRoJztcclxuICBzdmcuYXBwZW5kQ2hpbGQobmV3UGF0aCk7XHJcblxyXG4gIC8vIGlmIGZpcnN0IGVsZW1lbnQgaXMgbG93ZXIgdGhhbiB0aGUgc2Vjb25kLCBzd2FwIVxyXG4gIGlmIChzdGFydEVsZW0ub2Zmc2V0VG9wID4gZW5kRWxlbS5vZmZzZXRUb3ApIHtcclxuICAgIHZhciB0ZW1wID0gc3RhcnRFbGVtO1xyXG4gICAgc3RhcnRFbGVtID0gZW5kRWxlbTtcclxuICAgIGVuZEVsZW0gPSB0ZW1wO1xyXG4gIH1cclxuXHJcbiAgZXhlcmNpc2UucGF0aHMucHVzaCh7cGF0aDogbmV3UGF0aCwgc3RhcnRFbGVtOiBzdGFydEVsZW19KTtcclxuXHJcbiAgLy8gZ2V0ICh0b3AsIGxlZnQpIGNvcm5lciBjb29yZGluYXRlcyBvZiB0aGUgc3ZnIGNvbnRhaW5lciAgIFxyXG4gIHZhciBzdmdUb3AgID0gc3ZnQ29udGFpbmVyLm9mZnNldFRvcDtcclxuICB2YXIgc3ZnTGVmdCA9IHN2Z0NvbnRhaW5lci5vZmZzZXRMZWZ0O1xyXG5cclxuICAvLyBjYWxjdWxhdGUgcGF0aCdzIHN0YXJ0ICh4LHkpICBjb29yZHNcclxuICAvLyB3ZSB3YW50IHRoZSB4IGNvb3JkaW5hdGUgdG8gdmlzdWFsbHkgcmVzdWx0IGluIHRoZSBlbGVtZW50J3MgbWlkIHBvaW50XHJcbiAgdmFyIHN0YXJ0WCA9IHN0YXJ0RWxlbS5vZmZzZXRMZWZ0ICsgMC41ICogc3RhcnRFbGVtLm9mZnNldFdpZHRoIC0gc3ZnTGVmdDsgICAgLy8geCA9IGxlZnQgb2Zmc2V0ICsgMC41KndpZHRoIC0gc3ZnJ3MgbGVmdCBvZmZzZXRcclxuICB2YXIgc3RhcnRZID0gc3RhcnRFbGVtLm9mZnNldFRvcCArIDAuNSAqIHN0YXJ0RWxlbS5vZmZzZXRIZWlnaHQgLSBzdmdUb3A7ICAgICAgICAvLyB5ID0gdG9wIG9mZnNldCArIGhlaWdodCAtIHN2ZydzIHRvcCBvZmZzZXRcclxuXHJcbiAgICAgIC8vIGNhbGN1bGF0ZSBwYXRoJ3MgZW5kICh4LHkpIGNvb3Jkc1xyXG4gIHZhciBlbmRYID0gZW5kRWxlbS5vZmZzZXRMZWZ0ICsgMC41ICogZW5kRWxlbS5vZmZzZXRXaWR0aCAtIHN2Z0xlZnQ7XHJcbiAgdmFyIGVuZFkgPSBlbmRFbGVtLm9mZnNldFRvcCArIDAuNSAqIGVuZEVsZW0ub2Zmc2V0SGVpZ2h0IC0gc3ZnVG9wO1xyXG5cclxuICAvLyBjYWxsIGZ1bmN0aW9uIGZvciBkcmF3aW5nIHRoZSBwYXRoXHJcbiAgZHJhd1BhdGgoc3ZnLCBuZXdQYXRoLCBzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSk7XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gZHJhd0Nvbm5lY3RvcnMoZXhlcmNpc2UsIGV4ZXJjaXNlc1RvQ29ubmVjdCkge1xyXG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZXhlcmNpc2UuaWQpO1xyXG4gIC8vIGNvbm5lY3QgYWxsIHRoZSBwYXRocyB5b3Ugd2FudCFcclxuICBleGVyY2lzZXNUb0Nvbm5lY3QuZm9yRWFjaChmdW5jdGlvbihlKSB7XHJcbiAgICBsZXQgZWxlbWVudFRvQ29ubmVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGUpO1xyXG4gICAgY29ubmVjdEVsZW1lbnRzKGV4ZXJjaXNlLCBlbGVtZW50VG9Db25uZWN0LCBlbGVtZW50KTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbW92ZVBvcHVwKGV4ZXJjaXNlSUQpIHtcclxuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGV4ZXJjaXNlSUQpO1xyXG4gIHZhciBwb3B1cCA9IGVsZW1lbnQuY2hpbGROb2Rlc1swXS5jaGlsZHJlblsxXTtcclxuICBwb3B1cC5zdHlsZS50b3AgPSAoMCAtIHBvcHVwLmNsaWVudEhlaWdodCkgKyAncHgnO1xyXG4gIHBvcHVwLnN0eWxlLmxlZnQgPSAoKGVsZW1lbnQuY2xpZW50V2lkdGggLSBwb3B1cC5jbGllbnRXaWR0aCkgLyAyKSArICdweCc7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZXhlcmNpc2UtY29tcG9uZW50JyxcclxuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL2V4ZXJjaXNlL2V4ZXJjaXNlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnYXBwL2NvbXBvbmVudHMvZXhlcmNpc2UvZXhlcmNpc2UuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRXhlcmNpc2VDb21wb25lbnQge1xyXG4gIHByaXZhdGUgX2V4ZXJjaXNlID0ge307XHJcbiAgcHJpdmF0ZSBfcHJlcmVxcyA9IFtdO1xyXG4gIHByaXZhdGUgc2hvd1ByZXJlcXVpc2l0ZXMgPSBmYWxzZTtcclxuICBwcml2YXRlIGNvbXBsZXRlZEV4ZXJjaXNlID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBjYW5TdGFydEV4ZXJjaXNlID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSB0b3RhbCA9IDA7XHJcbiAgcHJpdmF0ZSBoYXNEcmF3bkxpbmVzID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBwb3B1cFVwZGF0ZWQgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgZXhlcmNpc2UoZXhlcmNpc2UpIHtcclxuICAgIHRoaXMuX2V4ZXJjaXNlID0gZXhlcmNpc2U7XHJcbiAgICB0aGlzLl9leGVyY2lzZS5tYXhQb2ludHMgPSAxO1xyXG4gICAgdGhpcy5fZXhlcmNpc2UuY3VycmVudFBvaW50cyA9IDA7XHJcbiAgICB0aGlzLl9leGVyY2lzZS5wYXRocyA9IFtdO1xyXG4gICAgdGhpcy5fZXhlcmNpc2UucHJlcmVxdWlzaXRlcyA9IGV4ZXJjaXNlLnByZXJlcXVpc2l0ZXMgfHwgW107XHJcbiAgfTtcclxuXHJcbiAgZ2V0IGV4ZXJjaXNlKCkgeyByZXR1cm4gdGhpcy5fZXhlcmNpc2U7IH07XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHByZXJlcXMocHJlcmVxcykge1xyXG4gICAgaWYgKCFwcmVyZXFzIHx8IHByZXJlcXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuY2FuU3RhcnRFeGVyY2lzZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuc2hvd1ByZXJlcXVpc2l0ZXMgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3ByZXJlcXMgPSBwcmVyZXFzO1xyXG4gICAgICB2YXIgY3VycmVudFRvdGFsID0gMDtcclxuICAgICAgcHJlcmVxcy5mb3JFYWNoKGZ1bmN0aW9uKHByZXJlcSkge1xyXG4gICAgICAgIGN1cnJlbnRUb3RhbCArPSBwcmVyZXEubWF4UG9pbnRzO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy50b3RhbCA9IGN1cnJlbnRUb3RhbDtcclxuICAgICAgdGhpcy5zaG93UHJlcmVxdWlzaXRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAodGhpcy5fZXhlcmNpc2UuaWQgPT09ICdlbXB0eScpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX3ByZXJlcXMubGVuZ3RoID4gMCAmJiAhdGhpcy5oYXNEcmF3bkxpbmVzKSB7XHJcbiAgICAgIGxldCBpZHMgPSBbXTtcclxuICAgICAgdGhpcy5fcHJlcmVxcy5mb3JFYWNoKGZ1bmN0aW9uKHByZXJlcSkge1xyXG4gICAgICAgIGlkcy5wdXNoKHByZXJlcS5pZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBkcmF3Q29ubmVjdG9ycyh0aGlzLl9leGVyY2lzZSwgaWRzKTtcclxuICAgICAgdGhpcy5oYXNEcmF3bkxpbmVzID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpIHtcclxuICAgIGlmICh0aGlzLl9wcmVyZXFzLmxlbmd0aCA+IDAgJiYgSlNPTi5zdHJpbmdpZnkodGhpcy5fcHJlcmVxcykgIT09IHRoaXMub2xkUG9pbnRzKSB7XHJcbiAgICAgIHRoaXMuY2hlY2tQcmVyZXFzQ29tcGxldGUoKTtcclxuICAgICAgdGhpcy51cGRhdGVQYXRocygpO1xyXG4gICAgICB0aGlzLm9sZFBvaW50cyA9IEpTT04uc3RyaW5naWZ5KHRoaXMuX3ByZXJlcXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DbGljayhldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmICghdGhpcy5jYW5TdGFydEV4ZXJjaXNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChldmVudC5idXR0b24gPT09IDAgJiYgdGhpcy5fZXhlcmNpc2UuY3VycmVudFBvaW50cyA8IHRoaXMuX2V4ZXJjaXNlLm1heFBvaW50cykge1xyXG4gICAgICB0aGlzLl9leGVyY2lzZS5jdXJyZW50UG9pbnRzKys7XHJcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMiAmJiB0aGlzLl9leGVyY2lzZS5jdXJyZW50UG9pbnRzID4gMCkge1xyXG4gICAgICB0aGlzLl9leGVyY2lzZS5jdXJyZW50UG9pbnRzLS07XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fZXhlcmNpc2UuY3VycmVudFBvaW50cyA9PT0gdGhpcy5fZXhlcmNpc2UubWF4UG9pbnRzKSB7XHJcbiAgICAgIHRoaXMuX2V4ZXJjaXNlLmNvbXBsZXRlZEV4ZXJjaXNlID0gdGhpcy5jb21wbGV0ZWRFeGVyY2lzZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9leGVyY2lzZS5jb21wbGV0ZWRFeGVyY2lzZSA9IHRoaXMuY29tcGxldGVkRXhlcmNpc2UgPSBmYWxzZTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBvbk1vdXNlT3ZlcigpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZiAoIXRoaXMucG9wdXBVcGRhdGVkKSB7XHJcbiAgICAgIG1vdmVQb3B1cCh0aGlzLl9leGVyY2lzZS5pZCk7XHJcbiAgICAgIHRoaXMucG9wdXBVcGRhdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuX2V4ZXJjaXNlLnBhdGhzLmZvckVhY2goZnVuY3Rpb24oZSkge1xyXG4gICAgICB2YXIgcGF0aCA9IGUucGF0aDtcclxuICAgICAgaWYgKHBhdGguZ2V0QXR0cmlidXRlKCdzdHJva2UnKSAhPT0gJ2dvbGQnKSB7XHJcbiAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICd5ZWxsb3cnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgb25Nb3VzZUxlYXZlKCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuX2V4ZXJjaXNlLnBhdGhzLmZvckVhY2goZnVuY3Rpb24oZSkge1xyXG4gICAgICB2YXIgcGF0aCA9IGUucGF0aDtcclxuICAgICAgaWYgKHBhdGguZ2V0QXR0cmlidXRlKCdzdHJva2UnKSAhPT0gJ2dvbGQnKSB7XHJcbiAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdibGFjaycpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNoZWNrUHJlcmVxc0NvbXBsZXRlKCkge1xyXG4gICAgdmFyIHN1bSA9IDA7XHJcbiAgICB0aGlzLl9wcmVyZXFzLmZvckVhY2goZnVuY3Rpb24ocHJlcmVxKSB7XHJcbiAgICAgIHN1bSArPSBwcmVyZXEuY3VycmVudFBvaW50cztcclxuICAgIH0pO1xyXG4gICAgdGhpcy5jYW5TdGFydEV4ZXJjaXNlID0gKHN1bSA9PT0gdGhpcy50b3RhbCkgPyB0cnVlIDogZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgdXBkYXRlUGF0aHMoKSB7XHJcbiAgICB0aGlzLl9leGVyY2lzZS5wYXRocy5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgdmFyIHBhdGggPSBlLnBhdGgsXHJcbiAgICAgICAgICBzdGFydEVsZW0gPSBlLnN0YXJ0RWxlbTtcclxuICAgICAgaWYgKHN0YXJ0RWxlbS5jaGlsZHJlblswXS5jbGFzc05hbWUuaW5kZXhPZignZXhlcmNpc2UtY29tcGxldGVkJykgIT09IC0xKSB7XHJcbiAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdnb2xkJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdibGFjaycpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxufSJdfQ==
