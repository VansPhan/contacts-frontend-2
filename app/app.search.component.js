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
var core_1 = require('@angular/core');
var service_1 = require('./models/service');
var SearchComponent = (function () {
    function SearchComponent(contactService) {
        this.contactService = contactService;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contactService.getContacts()
            .subscribe(function (contacts) {
            _this.contacts = contacts;
            if (Array.isArray(_this.contacts)) {
                for (var _i = 0, _a = _this.contacts; _i < _a.length; _i++) {
                    var contact = _a[_i];
                    //Regex to remove everything but number to have a pure integer string for easy search for phone numbers
                    contact['number'] = contact['phone_number'].replace(/\D/g, '');
                    //Check if phone number is international by having the string lead with 1-
                    if (contact['phone_number'].split("")[0].match("1") && contact['phone_number'].split("")[1].match("-")) {
                        contact['international'] = true;
                    }
                    else {
                        contact['international'] = false;
                    }
                    //Checking if the number has an extention
                    if (contact['phone_number'].match("x")) {
                        contact['ext'] = true;
                    }
                    else {
                        contact['ext'] = false;
                    }
                }
            }
            _this.original = _this.contacts;
        });
    };
    SearchComponent.prototype.filter = function (radio) {
        //Empty array to add filtered out contacts that met the following conditions, will be use to display the new contacts
        var arr = [];
        //switch case that decides which radio is checked and sorts the data accordingly
        switch (radio) {
            case "all":
                this.contacts = this.original;
                break;
            case "international":
                for (var _i = 0, _a = this.original; _i < _a.length; _i++) {
                    var contact = _a[_i];
                    if (contact["international"] == true) {
                        arr.push(contact);
                    }
                }
                this.contacts = arr;
                console.log(this.contacts);
                break;
            case "ext":
                for (var _b = 0, _c = this.original; _b < _c.length; _b++) {
                    var contact = _c[_b];
                    if (contact["ext"] == true) {
                        arr.push(contact);
                    }
                }
                this.contacts = arr;
                break;
            case "com":
                for (var _d = 0, _e = this.original; _d < _e.length; _d++) {
                    var contact = _e[_d];
                    if (contact["email_address"].match(".com")) {
                        arr.push(contact);
                    }
                }
                this.contacts = arr;
                console.log(this.contacts);
                break;
            case "email":
                //I push each object into array in order to make an immutable copy of contacts array
                for (var _f = 0, _g = this.original; _f < _g.length; _f++) {
                    var contact = _g[_f];
                    arr.push(contact);
                }
                this.contacts = arr;
                break;
            default:
                break;
        }
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'search',
            templateUrl: 'app/app.search.component.html',
            styleUrls: ['app/app.search.component.css']
        }), 
        __metadata('design:paramtypes', [service_1.ContactService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=app.search.component.js.map