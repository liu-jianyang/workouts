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
var updates_service_1 = require("../../services/updates.service");
var UpdatesComponent = (function () {
    function UpdatesComponent(updatesService) {
        this.updatesService = updatesService;
        this.title = 'Changelog';
        this.updates = [];
        this.mode = 'Observable';
    }
    ;
    UpdatesComponent.prototype.ngOnInit = function () {
        this.getUpdates();
    };
    ;
    UpdatesComponent.prototype.getUpdates = function () {
        var _this = this;
        this.updatesService.getUpdates()
            .subscribe(function (updates) { return _this.updates = updates; }, function (error) { return _this.errorMessage = error; });
    };
    ;
    return UpdatesComponent;
}());
UpdatesComponent = __decorate([
    core_1.Component({
        selector: 'updates',
        templateUrl: 'app/components/updates/updates.component.html',
        styleUrls: ['app/components/updates/updates.component.css']
    }),
    __metadata("design:paramtypes", [updates_service_1.UpdatesService])
], UpdatesComponent);
exports.UpdatesComponent = UpdatesComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb21wb25lbnRzL3VwZGF0ZXMvdXBkYXRlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUEwQztBQUMxQyxrRUFBZ0U7QUFRaEUsSUFBYSxnQkFBZ0I7SUFLM0IsMEJBQXFCLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUozQyxVQUFLLEdBQUcsV0FBVyxDQUFDO1FBQzVCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFFYixTQUFJLEdBQUcsWUFBWSxDQUFDO0lBQ2tDLENBQUM7SUFBQSxDQUFDO0lBQ3hELG1DQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUFBLENBQUM7SUFFRixxQ0FBVSxHQUFWO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRTthQUM3QixTQUFTLENBQ1IsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sRUFBdEIsQ0FBc0IsRUFDakMsVUFBQSxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxHQUFRLEtBQUssRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFBQSxDQUFDO0lBQ0osdUJBQUM7QUFBRCxDQWhCQSxBQWdCQyxJQUFBO0FBaEJZLGdCQUFnQjtJQU41QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFNBQVM7UUFDbkIsV0FBVyxFQUFFLCtDQUErQztRQUM1RCxTQUFTLEVBQUUsQ0FBQyw4Q0FBOEMsQ0FBQztLQUM1RCxDQUFDO3FDQU9xQyxnQ0FBYztHQUx4QyxnQkFBZ0IsQ0FnQjVCO0FBaEJZLDRDQUFnQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy91cGRhdGVzL3VwZGF0ZXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFVwZGF0ZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdXBkYXRlcy5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndXBkYXRlcycsXHJcbiAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy91cGRhdGVzL3VwZGF0ZXMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWydhcHAvY29tcG9uZW50cy91cGRhdGVzL3VwZGF0ZXMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVXBkYXRlc0NvbXBvbmVudCB7XHJcbiAgcHJpdmF0ZSB0aXRsZSA9ICdDaGFuZ2Vsb2cnO1xyXG4gIHVwZGF0ZXMgPSBbXTtcclxuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICBtb2RlID0gJ09ic2VydmFibGUnO1xyXG4gIGNvbnN0cnVjdG9yIChwcml2YXRlIHVwZGF0ZXNTZXJ2aWNlOiBVcGRhdGVzU2VydmljZSkge307XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmdldFVwZGF0ZXMoKTtcclxuICB9O1xyXG5cclxuICBnZXRVcGRhdGVzKCkge1xyXG4gICAgdGhpcy51cGRhdGVzU2VydmljZS5nZXRVcGRhdGVzKClcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICB1cGRhdGVzID0+IHRoaXMudXBkYXRlcyA9IHVwZGF0ZXMsXHJcbiAgICAgICAgZXJyb3IgPT4gIHRoaXMuZXJyb3JNZXNzYWdlID0gPGFueT5lcnJvcik7XHJcbiAgfTtcclxufSJdfQ==
