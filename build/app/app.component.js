"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Bodyweight exercises';
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        var navBar = document.getElementById('nav-bar');
        var container = document.getElementById('router-container');
        container.style.marginTop = navBar.offsetHeight + 'px';
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app/app.component.html',
        styleUrls: ['app/app.component.css']
    })
], AppComponent);
exports.AppComponent = AppComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxzQ0FBd0M7QUFReEMsSUFBYSxZQUFZO0lBTnpCO1FBT0UsVUFBSyxHQUFHLHNCQUFzQixDQUFDO0lBT2pDLENBQUM7SUFMQyxzQ0FBZSxHQUFmO1FBQ0UsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDNUQsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDekQsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FSQSxBQVFDLElBQUE7QUFSWSxZQUFZO0lBTnhCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUMsUUFBUTtRQUNqQixXQUFXLEVBQUUsMEJBQTBCO1FBQ3ZDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO0tBQ3JDLENBQUM7R0FFVyxZQUFZLENBUXhCO0FBUlksb0NBQVkiLCJmaWxlIjoiYXBwL2FwcC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjonbXktYXBwJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2FwcC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJ2FwcC9hcHAuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcclxuICB0aXRsZSA9ICdCb2R5d2VpZ2h0IGV4ZXJjaXNlcyc7XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIGxldCBuYXZCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2LWJhcicpO1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3V0ZXItY29udGFpbmVyJyk7XHJcbiAgICBjb250YWluZXIuc3R5bGUubWFyZ2luVG9wID0gbmF2QmFyLm9mZnNldEhlaWdodCArICdweCc7XHJcbiAgfVxyXG59Il19
