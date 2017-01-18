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
var exercises_service_1 = require("../../services/exercises.service");
var name_mapping_service_1 = require("../../services/name-mapping.service");
var LEVELS = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
];
function resetSvg() {
    // reset svg each time 
    var svg = document.getElementById('svg');
    svg.setAttribute('height', '0');
    svg.setAttribute('width', '0');
}
var ExerciseGridComponent = (function () {
    function ExerciseGridComponent(exercisesService, nameMappingService) {
        this.exercisesService = exercisesService;
        this.nameMappingService = nameMappingService;
        this.nameMapping = {};
        this.mode = 'Observable';
    }
    ;
    ExerciseGridComponent.prototype.ngOnInit = function () {
        this.getExercises();
        this.getNameMapping();
        resetSvg();
    };
    ;
    ExerciseGridComponent.prototype.getExercises = function () {
        var _this = this;
        this.exercisesService.getExercises()
            .subscribe(function (exercises) { return _this.exerciseLists = exercises; }, function (error) { return _this.errorMessage = error; });
    };
    ;
    ExerciseGridComponent.prototype.getNameMapping = function () {
        var _this = this;
        this.nameMappingService.getNameMapping()
            .subscribe(function (nameMapping) { return _this.nameMapping = nameMapping; }, function (error) { return _this.errorMessage = error; });
    };
    ;
    return ExerciseGridComponent;
}());
ExerciseGridComponent = __decorate([
    core_1.Component({
        selector: 'exercise-grid',
        templateUrl: 'app/components/grid/exercise-grid.component.html',
        styleUrls: ['app/components/grid/exercise-grid.component.css']
    }),
    __metadata("design:paramtypes", [exercises_service_1.ExercisesService, name_mapping_service_1.NameMappingService])
], ExerciseGridComponent);
exports.ExerciseGridComponent = ExerciseGridComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb21wb25lbnRzL2dyaWQvZXhlcmNpc2UtZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFpRDtBQUNqRCxzRUFBb0U7QUFDcEUsNEVBQXlFO0FBRXpFLElBQU0sTUFBTSxHQUFhO0lBQ3ZCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7Q0FDdEQsQ0FBQztBQUVGO0lBQ0UsdUJBQXVCO0lBQ3ZCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDaEMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQVFELElBQWEscUJBQXFCO0lBS2hDLCtCQUFxQixnQkFBa0MsRUFBVSxrQkFBc0M7UUFBbEYscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFIdkcsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFFakIsU0FBSSxHQUFHLFlBQVksQ0FBQztJQUNzRixDQUFDO0lBQUEsQ0FBQztJQUM1Ryx3Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixRQUFRLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFBQSxDQUFDO0lBRUYsNENBQVksR0FBWjtRQUFBLGlCQUtDO1FBSkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRTthQUNqQyxTQUFTLENBQ1IsVUFBQSxTQUFTLElBQUksT0FBQSxLQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsRUFBOUIsQ0FBOEIsRUFDM0MsVUFBQSxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxHQUFRLEtBQUssRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFBQSxDQUFDO0lBQ0YsOENBQWMsR0FBZDtRQUFBLGlCQUtDO1FBSkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRTthQUNyQyxTQUFTLENBQ1IsVUFBQSxXQUFXLElBQUksT0FBQSxLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsRUFBOUIsQ0FBOEIsRUFDN0MsVUFBQSxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxHQUFRLEtBQUssRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFBQSxDQUFDO0lBQ0osNEJBQUM7QUFBRCxDQXhCQSxBQXdCQyxJQUFBO0FBeEJZLHFCQUFxQjtJQU5qQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGVBQWU7UUFDekIsV0FBVyxFQUFFLGtEQUFrRDtRQUMvRCxTQUFTLEVBQUUsQ0FBQyxpREFBaUQsQ0FBQztLQUMvRCxDQUFDO3FDQU91QyxvQ0FBZ0IsRUFBOEIseUNBQWtCO0dBTDVGLHFCQUFxQixDQXdCakM7QUF4Qlksc0RBQXFCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2dyaWQvZXhlcmNpc2UtZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV4ZXJjaXNlc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9leGVyY2lzZXMuc2VydmljZSc7XHJcbmltcG9ydCB7IE5hbWVNYXBwaW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25hbWUtbWFwcGluZy5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IExFVkVMUzogTnVtYmVyW10gPSBbXHJcbiAgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTZcclxuXTtcclxuXHJcbmZ1bmN0aW9uIHJlc2V0U3ZnKCkge1xyXG4gIC8vIHJlc2V0IHN2ZyBlYWNoIHRpbWUgXHJcbiAgbGV0IHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdmcnKTtcclxuICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMCcpO1xyXG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzAnKTtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdleGVyY2lzZS1ncmlkJyxcclxuICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL2dyaWQvZXhlcmNpc2UtZ3JpZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJ2FwcC9jb21wb25lbnRzL2dyaWQvZXhlcmNpc2UtZ3JpZC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBFeGVyY2lzZUdyaWRDb21wb25lbnQge1xyXG4gIGV4ZXJjaXNlTGlzdHM6IGFueVtdO1xyXG4gIG5hbWVNYXBwaW5nID0ge307XHJcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgbW9kZSA9ICdPYnNlcnZhYmxlJztcclxuICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBleGVyY2lzZXNTZXJ2aWNlOiBFeGVyY2lzZXNTZXJ2aWNlLCBwcml2YXRlIG5hbWVNYXBwaW5nU2VydmljZTogTmFtZU1hcHBpbmdTZXJ2aWNlKSB7fTtcclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZ2V0RXhlcmNpc2VzKCk7XHJcbiAgICB0aGlzLmdldE5hbWVNYXBwaW5nKCk7XHJcbiAgICByZXNldFN2ZygpO1xyXG4gIH07XHJcblxyXG4gIGdldEV4ZXJjaXNlcygpIHtcclxuICAgIHRoaXMuZXhlcmNpc2VzU2VydmljZS5nZXRFeGVyY2lzZXMoKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgIGV4ZXJjaXNlcyA9PiB0aGlzLmV4ZXJjaXNlTGlzdHMgPSBleGVyY2lzZXMsXHJcbiAgICAgICAgZXJyb3IgPT4gIHRoaXMuZXJyb3JNZXNzYWdlID0gPGFueT5lcnJvcik7XHJcbiAgfTtcclxuICBnZXROYW1lTWFwcGluZygpIHtcclxuICAgIHRoaXMubmFtZU1hcHBpbmdTZXJ2aWNlLmdldE5hbWVNYXBwaW5nKClcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICBuYW1lTWFwcGluZyA9PiB0aGlzLm5hbWVNYXBwaW5nID0gbmFtZU1hcHBpbmcsXHJcbiAgICAgICAgZXJyb3IgPT4gIHRoaXMuZXJyb3JNZXNzYWdlID0gPGFueT5lcnJvcik7XHJcbiAgfTtcclxufSJdfQ==
