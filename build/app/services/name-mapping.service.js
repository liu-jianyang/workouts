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
var NameMappingService = (function () {
    // url = 'app/mock/name-mapping.json';
    function NameMappingService(http) {
        this.http = http;
        this.url = 'api/name-mapping';
    }
    NameMappingService.prototype.getNameMapping = function () {
        return this.http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    NameMappingService.prototype.extractData = function (res) {
        var body = res.json();
        var data = {};
        body.forEach(function (ele) {
            data[ele.key] = ele.value;
        });
        return data || {};
    };
    NameMappingService.prototype.handleError = function (error) {
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
    return NameMappingService;
}());
NameMappingService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], NameMappingService);
exports.NameMappingService = NameMappingService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZXJ2aWNlcy9uYW1lLW1hcHBpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQStDO0FBQy9DLHNDQUErQztBQUMvQyw4QkFBeUM7QUFHekMsSUFBYSxrQkFBa0I7SUFFN0Isc0NBQXNDO0lBQ3RDLDRCQUFxQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUZ2QixRQUFHLEdBQUcsa0JBQWtCLENBQUM7SUFFQyxDQUFDO0lBQ25DLDJDQUFjLEdBQWQ7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUNiLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQ3JCLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNPLHdDQUFXLEdBQW5CLFVBQW9CLEdBQWE7UUFDL0IsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBUyxHQUFHO1lBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRyxDQUFDO0lBQ3JCLENBQUM7SUFDTyx3Q0FBVyxHQUFuQixVQUFxQixLQUFxQjtRQUN4QyxvRUFBb0U7UUFDcEUsSUFBSSxNQUFjLENBQUM7UUFDbkIsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLGVBQVEsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUNoQyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsTUFBTSxHQUFNLEtBQUssQ0FBQyxNQUFNLFlBQU0sS0FBSyxDQUFDLFVBQVUsSUFBSSxFQUFFLFVBQUksR0FBSyxDQUFDO1FBQ2hFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVELENBQUM7UUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxlQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDSCx5QkFBQztBQUFELENBOUJBLEFBOEJDLElBQUE7QUE5Qlksa0JBQWtCO0lBRDlCLGlCQUFVLEVBQUU7cUNBSWdCLFdBQUk7R0FIcEIsa0JBQWtCLENBOEI5QjtBQTlCWSxnREFBa0IiLCJmaWxlIjoiYXBwL3NlcnZpY2VzL25hbWUtbWFwcGluZy5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9ICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9ICAgICBmcm9tICdyeGpzL1J4JztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5hbWVNYXBwaW5nU2VydmljZSB7XHJcbiAgcHJpdmF0ZSB1cmwgPSAnYXBpL25hbWUtbWFwcGluZyc7XHJcbiAgLy8gdXJsID0gJ2FwcC9tb2NrL25hbWUtbWFwcGluZy5qc29uJztcclxuICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBodHRwOiBIdHRwKSB7fVxyXG4gIGdldE5hbWVNYXBwaW5nICgpOiBPYnNlcnZhYmxlPGFueVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnVybClcclxuICAgICAgICAgICAgICAgICAgICAubWFwKHRoaXMuZXh0cmFjdERhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gIH1cclxuICBwcml2YXRlIGV4dHJhY3REYXRhKHJlczogUmVzcG9uc2UpIHtcclxuICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcclxuICAgIGxldCBkYXRhID0ge307XHJcbiAgICBib2R5LmZvckVhY2goZnVuY3Rpb24oZWxlKSB7XHJcbiAgICAgIGRhdGFbZWxlLmtleV0gPSBlbGUudmFsdWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkYXRhIHx8IHsgfTtcclxuICB9XHJcbiAgcHJpdmF0ZSBoYW5kbGVFcnJvciAoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XHJcbiAgICAvLyBJbiBhIHJlYWwgd29ybGQgYXBwLCB3ZSBtaWdodCB1c2UgYSByZW1vdGUgbG9nZ2luZyBpbmZyYXN0cnVjdHVyZVxyXG4gICAgbGV0IGVyck1zZzogc3RyaW5nO1xyXG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgUmVzcG9uc2UpIHtcclxuICAgICAgY29uc3QgYm9keSA9IGVycm9yLmpzb24oKSB8fCAnJztcclxuICAgICAgY29uc3QgZXJyID0gYm9keS5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShib2R5KTtcclxuICAgICAgZXJyTXNnID0gYCR7ZXJyb3Iuc3RhdHVzfSAtICR7ZXJyb3Iuc3RhdHVzVGV4dCB8fCAnJ30gJHtlcnJ9YDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVyck1zZyA9IGVycm9yLm1lc3NhZ2UgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTtcclxuICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVyck1zZyk7XHJcbiAgfVxyXG59Il19
