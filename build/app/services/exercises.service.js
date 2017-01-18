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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var progressions = [
    'hs',
    'rhs',
    'hspushups',
    'rhspu',
    'press',
    'presshs',
    'rpresshs',
    'sapresshs',
    'manna',
    'bl',
    'fl',
    'flrow',
    'row',
    'pullup',
    'rpullup',
    'weightedpullup',
    'explosivepullup',
    'ironcross',
    'planche',
    'rplanche',
    'planchepushup',
    'rplanchepushup',
    'pushup',
    'oapushup',
    'dip',
    'rdip',
    'weighteddip',
    'muscleup',
    'el',
    'flag',
    'abs',
    'rstatic',
    'rkip',
    'rfelge',
    'squats'
];
function replaceStringWithElement(exercise, exerciseLists) {
    for (var i = 0; i < exercise.prerequisites.length; i++) {
        var array = exercise.prerequisites[i].split('_');
        exercise.prerequisites[i] = exerciseLists[array[0]][array[1]];
    }
}
function convertToViewFormat(exercisesArray) {
    var listOfLists = [];
    var exerciseLists = {};
    exercisesArray.forEach(function (exercise) {
        var progression = exercise.progression;
        exercise.id = exercise.eid;
        exercise.prerequisites = exercise.prerequisites ? exercise.prerequisites.split(',') : [];
        if (!exerciseLists[progression]) {
            exerciseLists[progression] = {};
        }
        exerciseLists[progression][exercise.level] = exercise;
    });
    LEVELS.forEach(function (levelNum) {
        var row = [];
        progressions.forEach(function (progression) {
            var exercise = exerciseLists[progression][levelNum];
            if (exercise) {
                replaceStringWithElement(exercise, exerciseLists);
            }
            else {
                exercise = {
                    id: 'empty'
                };
            }
            row.push(exercise);
        });
        listOfLists.push(row);
    });
    return listOfLists;
}
var ExercisesService = (function () {
    // url = 'app/mock/exercises.json';
    function ExercisesService(http) {
        this.http = http;
        this.url = 'api/exercises';
    }
    ExercisesService.prototype.getExercises = function () {
        return this.http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ExercisesService.prototype.extractData = function (res) {
        var body = res.json();
        return convertToViewFormat(body) || {};
    };
    ExercisesService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    return ExercisesService;
}());
ExercisesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ExercisesService);
exports.ExercisesService = ExercisesService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZXJ2aWNlcy9leGVyY2lzZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQStDO0FBQy9DLHNDQUErQztBQUMvQyw4QkFBeUM7QUFFekMsSUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN2RSxJQUFJLFlBQVksR0FBRztJQUNqQixJQUFJO0lBQ0osS0FBSztJQUNMLFdBQVc7SUFDWCxPQUFPO0lBQ1AsT0FBTztJQUNQLFNBQVM7SUFDVCxVQUFVO0lBQ1YsV0FBVztJQUNYLE9BQU87SUFDUCxJQUFJO0lBQ0osSUFBSTtJQUNKLE9BQU87SUFDUCxLQUFLO0lBQ0wsUUFBUTtJQUNSLFNBQVM7SUFDVCxnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLFdBQVc7SUFDWCxTQUFTO0lBQ1QsVUFBVTtJQUNWLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsUUFBUTtJQUNSLFVBQVU7SUFDVixLQUFLO0lBQ0wsTUFBTTtJQUNOLGFBQWE7SUFDYixVQUFVO0lBQ1YsSUFBSTtJQUNKLE1BQU07SUFDTixLQUFLO0lBQ0wsU0FBUztJQUNULE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtDQUFDLENBQUM7QUFFWixrQ0FBa0MsUUFBUSxFQUFFLGFBQWE7SUFDdkQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ3ZELElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENB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QyxJQUFJLENBQUMsQ0FBQztZQUMvQyxNQUFNLEdBQU0sS0FBSyxDQUFDLE1BQU0sWUFBTSxLQUFLLENBQUMsVUFBVSxJQUFJLEVBQUUsVUFBSSxHQUFLLENBQUM7UUFDaEUsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUQsQ0FBQztRQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLGVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0ExQkEsQUEwQkMsSUFBQTtBQTFCWSxnQkFBZ0I7SUFENUIsaUJBQVUsRUFBRTtxQ0FJZ0IsV0FBSTtHQUhwQixnQkFBZ0IsQ0EwQjVCO0FBMUJZLDRDQUFnQiIsImZpbGUiOiJhcHAvc2VydmljZXMvZXhlcmNpc2VzLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gICAgIGZyb20gJ3J4anMvUngnO1xyXG5cclxuY29uc3QgTEVWRUxTID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2XTtcclxudmFyIHByb2dyZXNzaW9ucyA9IFtcclxuICAnaHMnLFxyXG4gICdyaHMnLFxyXG4gICdoc3B1c2h1cHMnLFxyXG4gICdyaHNwdScsXHJcbiAgJ3ByZXNzJyxcclxuICAncHJlc3NocycsXHJcbiAgJ3JwcmVzc2hzJyxcclxuICAnc2FwcmVzc2hzJyxcclxuICAnbWFubmEnLFxyXG4gICdibCcsXHJcbiAgJ2ZsJyxcclxuICAnZmxyb3cnLFxyXG4gICdyb3cnLFxyXG4gICdwdWxsdXAnLFxyXG4gICdycHVsbHVwJyxcclxuICAnd2VpZ2h0ZWRwdWxsdXAnLFxyXG4gICdleHBsb3NpdmVwdWxsdXAnLFxyXG4gICdpcm9uY3Jvc3MnLFxyXG4gICdwbGFuY2hlJyxcclxuICAncnBsYW5jaGUnLFxyXG4gICdwbGFuY2hlcHVzaHVwJyxcclxuICAncnBsYW5jaGVwdXNodXAnLFxyXG4gICdwdXNodXAnLFxyXG4gICdvYXB1c2h1cCcsXHJcbiAgJ2RpcCcsXHJcbiAgJ3JkaXAnLFxyXG4gICd3ZWlnaHRlZGRpcCcsXHJcbiAgJ211c2NsZXVwJyxcclxuICAnZWwnLFxyXG4gICdmbGFnJyxcclxuICAnYWJzJyxcclxuICAncnN0YXRpYycsXHJcbiAgJ3JraXAnLFxyXG4gICdyZmVsZ2UnLFxyXG4gICdzcXVhdHMnXTtcclxuXHJcbmZ1bmN0aW9uIHJlcGxhY2VTdHJpbmdXaXRoRWxlbWVudChleGVyY2lzZSwgZXhlcmNpc2VMaXN0cykge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZXhlcmNpc2UucHJlcmVxdWlzaXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgbGV0IGFycmF5ID0gZXhlcmNpc2UucHJlcmVxdWlzaXRlc1tpXS5zcGxpdCgnXycpO1xyXG4gICAgZXhlcmNpc2UucHJlcmVxdWlzaXRlc1tpXSA9IGV4ZXJjaXNlTGlzdHNbYXJyYXlbMF1dW2FycmF5WzFdXTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbnZlcnRUb1ZpZXdGb3JtYXQoZXhlcmNpc2VzQXJyYXkpIHtcclxuICB2YXIgbGlzdE9mTGlzdHMgPSBbXTtcclxuICB2YXIgZXhlcmNpc2VMaXN0cyA9IHt9O1xyXG5cclxuICBleGVyY2lzZXNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGV4ZXJjaXNlKSB7XHJcbiAgICB2YXIgcHJvZ3Jlc3Npb24gPSBleGVyY2lzZS5wcm9ncmVzc2lvbjtcclxuXHJcbiAgICBleGVyY2lzZS5pZCA9IGV4ZXJjaXNlLmVpZDtcclxuICAgIGV4ZXJjaXNlLnByZXJlcXVpc2l0ZXMgPSBleGVyY2lzZS5wcmVyZXF1aXNpdGVzID8gZXhlcmNpc2UucHJlcmVxdWlzaXRlcy5zcGxpdCgnLCcpIDogW107XHJcbiAgICBpZiAoIWV4ZXJjaXNlTGlzdHNbcHJvZ3Jlc3Npb25dKSB7XHJcbiAgICAgIGV4ZXJjaXNlTGlzdHNbcHJvZ3Jlc3Npb25dID0ge307XHJcbiAgICB9XHJcbiAgICBleGVyY2lzZUxpc3RzW3Byb2dyZXNzaW9uXVtleGVyY2lzZS5sZXZlbF0gPSBleGVyY2lzZTtcclxuICB9KTtcclxuXHJcbiAgTEVWRUxTLmZvckVhY2goZnVuY3Rpb24obGV2ZWxOdW0pIHtcclxuICAgIHZhciByb3cgPSBbXTtcclxuICAgIHByb2dyZXNzaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHByb2dyZXNzaW9uKSB7XHJcbiAgICAgIHZhciBleGVyY2lzZSA9IGV4ZXJjaXNlTGlzdHNbcHJvZ3Jlc3Npb25dW2xldmVsTnVtXTtcclxuICAgICAgaWYgKGV4ZXJjaXNlKSB7XHJcbiAgICAgICAgcmVwbGFjZVN0cmluZ1dpdGhFbGVtZW50KGV4ZXJjaXNlLCBleGVyY2lzZUxpc3RzKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBleGVyY2lzZSA9IHtcclxuICAgICAgICAgIGlkOiAnZW1wdHknXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgICByb3cucHVzaChleGVyY2lzZSk7XHJcbiAgICB9KTtcclxuICAgIGxpc3RPZkxpc3RzLnB1c2gocm93KTtcclxuICB9KTtcclxuICByZXR1cm4gbGlzdE9mTGlzdHM7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEV4ZXJjaXNlc1NlcnZpY2Uge1xyXG4gIHByaXZhdGUgdXJsID0gJ2FwaS9leGVyY2lzZXMnO1xyXG4gIC8vIHVybCA9ICdhcHAvbW9jay9leGVyY2lzZXMuanNvbic7XHJcbiAgY29uc3RydWN0b3IgKHByaXZhdGUgaHR0cDogSHR0cCkge31cclxuICBnZXRFeGVyY2lzZXMgKCk6IE9ic2VydmFibGU8YW55W10+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMudXJsKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAodGhpcy5leHRyYWN0RGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgfVxyXG4gIHByaXZhdGUgZXh0cmFjdERhdGEocmVzOiBSZXNwb25zZSkge1xyXG4gICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xyXG4gICAgcmV0dXJuIGNvbnZlcnRUb1ZpZXdGb3JtYXQoYm9keSkgfHwgeyB9O1xyXG4gIH1cclxuICBwcml2YXRlIGhhbmRsZUVycm9yIChlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcclxuICAgIC8vIEluIGEgcmVhbCB3b3JsZCBhcHAsIHdlIG1pZ2h0IHVzZSBhIHJlbW90ZSBsb2dnaW5nIGluZnJhc3RydWN0dXJlXHJcbiAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XHJcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBSZXNwb25zZSkge1xyXG4gICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8ICcnO1xyXG4gICAgICBjb25zdCBlcnIgPSBib2R5LmVycm9yIHx8IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xyXG4gICAgICBlcnJNc2cgPSBgJHtlcnJvci5zdGF0dXN9IC0gJHtlcnJvci5zdGF0dXNUZXh0IHx8ICcnfSAke2Vycn1gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZXJyTXNnID0gZXJyb3IubWVzc2FnZSA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvci50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5lcnJvcihlcnJNc2cpO1xyXG4gICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyTXNnKTtcclxuICB9XHJcbn0iXX0=
