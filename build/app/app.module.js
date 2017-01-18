"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var exercise_component_1 = require("./components/exercise/exercise.component");
var exercise_grid_component_1 = require("./components/grid/exercise-grid.component");
var credits_component_1 = require("./components/credits/credits.component");
var updates_component_1 = require("./components/updates/updates.component");
var http_component_1 = require("./components/http/http.component");
var exercises_service_1 = require("./services/exercises.service");
var name_mapping_service_1 = require("./services/name-mapping.service");
var updates_service_1 = require("./services/updates.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            app_routing_1.routing
        ],
        declarations: [
            app_component_1.AppComponent,
            exercise_component_1.ExerciseComponent,
            exercise_grid_component_1.ExerciseGridComponent,
            credits_component_1.CreditsComponent,
            updates_component_1.UpdatesComponent,
            http_component_1.HttpComponent
        ],
        providers: [
            { provide: common_1.APP_BASE_HREF, useValue: '/' },
            exercises_service_1.ExercisesService,
            name_mapping_service_1.NameMappingService,
            updates_service_1.UpdatesService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxzQ0FBOEM7QUFDOUMsOERBQTBEO0FBQzFELHdDQUFnRDtBQUNoRCxzQ0FBK0M7QUFDL0MsMENBQThDO0FBRTlDLGlEQUFnRDtBQUNoRCw2Q0FBOEM7QUFFOUMsK0VBQTZFO0FBQzdFLHFGQUFrRjtBQUNsRiw0RUFBMEU7QUFDMUUsNEVBQTBFO0FBQzFFLG1FQUFpRTtBQUVqRSxrRUFBZ0U7QUFDaEUsd0VBQXFFO0FBQ3JFLDhEQUE0RDtBQXlCNUQsSUFBYSxTQUFTO0lBQXRCO0lBQXlCLENBQUM7SUFBRCxnQkFBQztBQUFELENBQXpCLEFBQTBCLElBQUE7QUFBYixTQUFTO0lBdkJyQixlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxnQ0FBYTtZQUNiLGlCQUFVO1lBQ1YsbUJBQVc7WUFDWCxxQkFBTztTQUNOO1FBQ0gsWUFBWSxFQUFFO1lBQ1osNEJBQVk7WUFDWixzQ0FBaUI7WUFDakIsK0NBQXFCO1lBQ3JCLG9DQUFnQjtZQUNoQixvQ0FBZ0I7WUFDaEIsOEJBQWE7U0FDZDtRQUNELFNBQVMsRUFBRTtZQUNULEVBQUMsT0FBTyxFQUFFLHNCQUFhLEVBQUUsUUFBUSxFQUFHLEdBQUcsRUFBRTtZQUN6QyxvQ0FBZ0I7WUFDaEIseUNBQWtCO1lBQ2xCLGdDQUFjO1NBQ2Y7UUFDRCxTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO0tBQzFCLENBQUM7R0FDVyxTQUFTLENBQUk7QUFBYiw4QkFBUyIsImZpbGUiOiJhcHAvYXBwLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9ICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgSHR0cE1vZHVsZSB9ICAgICBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHtBUFBfQkFTRV9IUkVGfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gIGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IHJvdXRpbmcgfSAgICAgICBmcm9tICcuL2FwcC5yb3V0aW5nJztcclxuXHJcbmltcG9ydCB7IEV4ZXJjaXNlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2V4ZXJjaXNlL2V4ZXJjaXNlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEV4ZXJjaXNlR3JpZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ncmlkL2V4ZXJjaXNlLWdyaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ3JlZGl0c0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jcmVkaXRzL2NyZWRpdHMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVXBkYXRlc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy91cGRhdGVzL3VwZGF0ZXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSHR0cENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9odHRwL2h0dHAuY29tcG9uZW50JztcclxuXHJcbmltcG9ydCB7IEV4ZXJjaXNlc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2V4ZXJjaXNlcy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmFtZU1hcHBpbmdTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9uYW1lLW1hcHBpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IFVwZGF0ZXNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy91cGRhdGVzLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBCcm93c2VyTW9kdWxlLFxyXG4gICAgSHR0cE1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgcm91dGluZ1xyXG4gICAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEFwcENvbXBvbmVudCxcclxuICAgIEV4ZXJjaXNlQ29tcG9uZW50LFxyXG4gICAgRXhlcmNpc2VHcmlkQ29tcG9uZW50LFxyXG4gICAgQ3JlZGl0c0NvbXBvbmVudCxcclxuICAgIFVwZGF0ZXNDb21wb25lbnQsXHJcbiAgICBIdHRwQ29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtwcm92aWRlOiBBUFBfQkFTRV9IUkVGLCB1c2VWYWx1ZSA6ICcvJyB9LFxyXG4gICAgRXhlcmNpc2VzU2VydmljZSxcclxuICAgIE5hbWVNYXBwaW5nU2VydmljZSxcclxuICAgIFVwZGF0ZXNTZXJ2aWNlXHJcbiAgXSxcclxuICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9Il19
