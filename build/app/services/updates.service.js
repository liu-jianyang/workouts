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
function convertToViewFormat(data) {
    var lines = data.split('\n');
    var retArr = [];
    var retObj = {};
    for (var i in lines) {
        var line = lines[i];
        if (line.match(/^#\s+.+\s+#/)) {
            continue;
        }
        else if (line.match(/^#\s*.+/)) {
            if (Object.keys(retObj).length > 0) {
                retArr.push(retObj);
            }
            retObj = {};
            var match = line.match(/^#\s*(.+)/);
            retObj['key'] = match[1];
        }
        else if (line.match(/^\s*-\s*.+/)) {
            var match = line.match(/^\s*-\s*(.+)/);
            if (retObj['value']) {
                retObj['value'].push(match[1]);
            }
            else {
                retObj['value'] = [match[1]];
            }
        }
        else {
        }
    }
    return retArr;
}
var UpdatesService = (function () {
    function UpdatesService(http) {
        this.http = http;
        this.url = 'CHANGELOG.md';
    }
    UpdatesService.prototype.getUpdates = function () {
        return this.http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UpdatesService.prototype.extractData = function (res) {
        return convertToViewFormat(res._body) || {};
    };
    UpdatesService.prototype.handleError = function (error) {
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
    return UpdatesService;
}());
UpdatesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UpdatesService);
exports.UpdatesService = UpdatesService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZXJ2aWNlcy91cGRhdGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUErQztBQUMvQyxzQ0FBK0M7QUFDL0MsOEJBQXlDO0FBRXpDLDZCQUE2QixJQUFJO0lBQy9CLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNoQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUM7UUFDWCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEIsQ0FBQztZQUNELE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDWixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLENBQUM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7UUFFUixDQUFDO0lBQ0gsQ0FBQztJQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUdELElBQWEsY0FBYztJQUV6Qix3QkFBcUIsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFEdkIsUUFBRyxHQUFHLGNBQWMsQ0FBQztJQUNLLENBQUM7SUFDbkMsbUNBQVUsR0FBVjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDckIsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ08sb0NBQVcsR0FBbkIsVUFBb0IsR0FBYTtRQUMvQixNQUFNLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUcsQ0FBQztJQUMvQyxDQUFDO0lBQ08sb0NBQVcsR0FBbkIsVUFBcUIsS0FBcUI7UUFDeEMsb0VBQW9FO1FBQ3BFLElBQUksTUFBYyxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxlQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDaEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLE1BQU0sR0FBTSxLQUFLLENBQUMsTUFBTSxZQUFNLEtBQUssQ0FBQyxVQUFVLElBQUksRUFBRSxVQUFJLEdBQUssQ0FBQztRQUNoRSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1RCxDQUFDO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsZUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQXhCQSxBQXdCQyxJQUFBO0FBeEJZLGNBQWM7SUFEMUIsaUJBQVUsRUFBRTtxQ0FHZ0IsV0FBSTtHQUZwQixjQUFjLENBd0IxQjtBQXhCWSx3Q0FBYyIsImZpbGUiOiJhcHAvc2VydmljZXMvdXBkYXRlcy5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9ICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9ICAgICBmcm9tICdyeGpzL1J4JztcclxuXHJcbmZ1bmN0aW9uIGNvbnZlcnRUb1ZpZXdGb3JtYXQoZGF0YSkge1xyXG4gIHZhciBsaW5lcyA9IGRhdGEuc3BsaXQoJ1xcbicpO1xyXG4gIHZhciByZXRBcnIgPSBbXTtcclxuICB2YXIgcmV0T2JqID0ge307XHJcbiAgZm9yIChsZXQgaSBpbiBsaW5lcykge1xyXG4gICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcclxuICAgIGlmIChsaW5lLm1hdGNoKC9eI1xccysuK1xccysjLykpIHtcclxuICAgICAgY29udGludWU7XHJcbiAgICB9IGVsc2UgaWYgKGxpbmUubWF0Y2goL14jXFxzKi4rLykpIHtcclxuICAgICAgaWYgKE9iamVjdC5rZXlzKHJldE9iaikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHJldEFyci5wdXNoKHJldE9iaik7XHJcbiAgICAgIH1cclxuICAgICAgcmV0T2JqID0ge307XHJcbiAgICAgIGxldCBtYXRjaCA9IGxpbmUubWF0Y2goL14jXFxzKiguKykvKTtcclxuICAgICAgcmV0T2JqWydrZXknXSA9IG1hdGNoWzFdO1xyXG4gICAgfSBlbHNlIGlmIChsaW5lLm1hdGNoKC9eXFxzKi1cXHMqLisvKSkge1xyXG4gICAgICBsZXQgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eXFxzKi1cXHMqKC4rKS8pO1xyXG4gICAgICBpZiAocmV0T2JqWyd2YWx1ZSddKSB7XHJcbiAgICAgICAgcmV0T2JqWyd2YWx1ZSddLnB1c2gobWF0Y2hbMV0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldE9ialsndmFsdWUnXSA9IFttYXRjaFsxXV07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcmV0QXJyO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBVcGRhdGVzU2VydmljZSB7XHJcbiAgcHJpdmF0ZSB1cmwgPSAnQ0hBTkdFTE9HLm1kJztcclxuICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBodHRwOiBIdHRwKSB7fVxyXG4gIGdldFVwZGF0ZXMgKCk6IE9ic2VydmFibGU8YW55W10+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMudXJsKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAodGhpcy5leHRyYWN0RGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgfVxyXG4gIHByaXZhdGUgZXh0cmFjdERhdGEocmVzOiBSZXNwb25zZSkge1xyXG4gICAgcmV0dXJuIGNvbnZlcnRUb1ZpZXdGb3JtYXQocmVzLl9ib2R5KSB8fCB7IH07XHJcbiAgfVxyXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IgKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xyXG4gICAgLy8gSW4gYSByZWFsIHdvcmxkIGFwcCwgd2UgbWlnaHQgdXNlIGEgcmVtb3RlIGxvZ2dpbmcgaW5mcmFzdHJ1Y3R1cmVcclxuICAgIGxldCBlcnJNc2c6IHN0cmluZztcclxuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFJlc3BvbnNlKSB7XHJcbiAgICAgIGNvbnN0IGJvZHkgPSBlcnJvci5qc29uKCkgfHwgJyc7XHJcbiAgICAgIGNvbnN0IGVyciA9IGJvZHkuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoYm9keSk7XHJcbiAgICAgIGVyck1zZyA9IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHQgfHwgJyd9ICR7ZXJyfWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlcnJNc2cgPSBlcnJvci5tZXNzYWdlID8gZXJyb3IubWVzc2FnZSA6IGVycm9yLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmVycm9yKGVyck1zZyk7XHJcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJNc2cpO1xyXG4gIH1cclxufSJdfQ==
