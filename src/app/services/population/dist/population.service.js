"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PopulationService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_development_1 = require("src/environments/environment.development");
var PopulationService = /** @class */ (function () {
    function PopulationService(http) {
        var _this = this;
        this.http = http;
        this.pupulationYearsToDisplay = [2015, 2016, 2017, 2018, 2019, 2020];
        this.getPopulationData = function (populationDrilldowns) {
            if (populationDrilldowns === void 0) { populationDrilldowns = 'Nation'; }
            return _this.http.get(environment_development_1.environment.populationApiUrl + "data?drilldowns=" + populationDrilldowns + "&measures=Population")
                .pipe(rxjs_1.map(function (_a) {
                var data = _a.data;
                return data;
            }), rxjs_1.map(function (data) {
                var population = data.filter(function (item) { return _this.pupulationYearsToDisplay.includes(item['ID Year']); });
                return population;
            })),
                rxjs_1.catchError(function (error) {
                    console.error(error);
                    return rxjs_1.of([]);
                });
        };
    }
    PopulationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PopulationService);
    return PopulationService;
}());
exports.PopulationService = PopulationService;
