"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
function inputMapGenerator() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ['keyup', 'keyboard']];
            case 1:
                _a.sent();
                return [4 /*yield*/, ['mousedown', 'mouse']];
            case 2:
                _a.sent();
                return [4 /*yield*/, ['mousemove', 'mouse']];
            case 3:
                _a.sent();
                return [4 /*yield*/, ['MSPointerDown', 'pointer']];
            case 4:
                _a.sent();
                return [4 /*yield*/, ['MSPointerMove', 'pointer']];
            case 5:
                _a.sent();
                return [4 /*yield*/, ['pointerdown', 'pointer']];
            case 6:
                _a.sent();
                return [4 /*yield*/, ['pointermove', 'pointer']];
            case 7:
                _a.sent();
                return [4 /*yield*/, ['touchstart', 'touch']];
            case 8:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
var WhatInput = (function () {
    function WhatInput() {
        /*
          ---------------
          Variables
          ---------------
        */
        // cache document.documentElement
        this.docElem = document.documentElement;
        // last used input type
        this.currentInput = 'initial';
        // last used input intent
        this.currentIntent = null;
        // form input types
        this.formInputs = [
            'input',
            'select',
            'textarea'
        ];
        // list of modifier keys commonly used with the mouse and
        // can be safely ignored to prevent false keyboard detection
        this.ignoreMap = [
            16,
            17,
            18,
            91,
            93 // Windows menu / right Apple cmd
        ];
        // array of all used input types
        this._inputTypes = [];
        // boolean: true if touch buffer timer is running
        this.isBuffering = false;
        // map of IE 10 pointer events
        this.pointerMap = {
            2: 'touch',
            3: 'touch',
            4: 'mouse'
        };
        // touch buffer timer
        this.touchTimer = null;
        this.inputMap = new Map(inputMapGenerator());
        // add correct mouse wheel event mapping to `inputMap`
        this.inputMap.set(this.detectWheel(), 'mouse');
        if (typeof rxjs_1.Subject !== "undefined") {
            this.watch = new rxjs_1.Subject();
        }
        this.addListeners();
        this.setInput();
    }
    // returns string: the current input type
    // opt: 'loose'|'strict'
    // 'strict' (default): returns the same value as the `data-whatinput` attribute
    // 'loose': includes `data-whatintent` value if it's more current than `data-whatinput`
    WhatInput.prototype.ask = function (opt) {
        if (opt === void 0) { opt = "strict"; }
        return (opt === 'loose') ? this.currentIntent : this.currentInput;
    };
    Object.defineProperty(WhatInput.prototype, "inputTypes", {
        // returns array: all the detected input types
        get: function () {
            return this._inputTypes;
        },
        enumerable: true,
        configurable: true
    });
    // updates the doc and `inputTypes` array with new input
    WhatInput.prototype.setInput = function () {
        if (typeof this.watch !== "undefined") {
            this.watch.next(this.currentInput);
        }
        this.docElem.setAttribute('data-whatinput', this.currentInput);
        this.docElem.setAttribute('data-whatintent', this.currentInput);
        if (this.inputTypes.indexOf(this.currentInput) === -1) {
            this.inputTypes.push(this.currentInput);
            this.docElem.className += ' whatinput-types-' + this.currentInput;
        }
    };
    /*
      ---------------
      Events
      ---------------
    */
    WhatInput.prototype.addListeners = function () {
        // `pointermove`, `MSPointerMove`, `mousemove` and mouse wheel event binding
        // can only demonstrate potential, but not actual, interaction
        // and are treated separately
        var _this = this;
        // pointer events (mouse, pen, touch)
        if (window["PointerEvent"]) {
            this.docElem.addEventListener('pointerdown', function (event) { return _this.updateInput(event); });
            this.docElem.addEventListener('pointermove', function (event) { return _this.setIntent(event); });
        }
        else if (window["MSPointerEvent"]) {
            this.docElem.addEventListener('MSPointerDown', function (event) { return _this.updateInput(event); });
            this.docElem.addEventListener('MSPointerMove', function (event) { return _this.setIntent(event); });
        }
        else {
            // mouse events
            this.docElem.addEventListener('mousedown', function (event) { return _this.updateInput(event); });
            this.docElem.addEventListener('mousemove', function (event) { return _this.setIntent(event); });
            // touch events
            if ('ontouchstart' in window) {
                this.docElem.addEventListener('touchstart', function (event) { return _this.touchBuffer(event); });
            }
        }
        // mouse wheel
        this.docElem.addEventListener(this.detectWheel(), function (event) { return _this.setIntent(event); });
        // keyboard events
        this.docElem.addEventListener('keydown', function (event) { return _this.updateInput(event); });
        this.docElem.addEventListener('keyup', function (event) { return _this.updateInput(event); });
    };
    // checks conditions before updating new input
    WhatInput.prototype.updateInput = function (event) {
        // only execute if the touch buffer timer isn't running
        if (!this.isBuffering) {
            var eventKey = event["which"];
            var value = this.inputMap.get(event.type);
            if (value === 'pointer')
                value = this.pointerType(event);
            var valueChanged = this.currentInput !== value || this.currentIntent !== value;
            if (valueChanged) {
                var activeElem = document.activeElement;
                var activeInput = activeElem instanceof HTMLInputElement || activeElem instanceof HTMLSelectElement || activeElem instanceof HTMLTextAreaElement;
                var setChange = value === 'touch' ||
                    // ignore mouse modifier keys
                    (value === "mouse" && this.ignoreMap.indexOf(eventKey) === -1) ||
                    // don't switch if the current element is a form input
                    (value === 'keyboard' && activeInput);
                if (setChange) {
                    // set the current and catch-all variable
                    this.currentInput = this.currentIntent = value;
                    this.setInput();
                }
            }
        }
    };
    // updates input intent for `mousemove` and `pointermove`
    WhatInput.prototype.setIntent = function (event) {
        // only execute if the touch buffer timer isn't running
        if (!this.isBuffering) {
            var value = this.inputMap.get(event.type);
            if (value === 'pointer')
                value = this.pointerType(event);
            if (this.currentIntent !== value) {
                this.currentIntent = value;
                this.docElem.setAttribute('data-whatintent', this.currentIntent);
            }
        }
    };
    // buffers touch events because they frequently also fire mouse events
    WhatInput.prototype.touchBuffer = function (event) {
        var _this = this;
        // clear the timer if it happens to be running
        window.clearTimeout(this.touchTimer);
        // set the current input
        this.updateInput(event);
        // set the isBuffering to `true`
        this.isBuffering = true;
        // run the timer
        this.touchTimer = window.setTimeout(function () {
            // if the timer runs out, set isBuffering back to `false`
            _this.isBuffering = false;
        }, 200);
    };
    /*
      ---------------
      Utilities
      ---------------
    */
    WhatInput.prototype.pointerType = function (event) {
        if (typeof event.pointerType === 'number') {
            return this.pointerMap[event.pointerType];
        }
        else {
            return (event.pointerType === 'pen') ? 'touch' : event.pointerType; // treat pen like touch
        }
    };
    // detect version of mouse wheel event to use
    // via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
    WhatInput.prototype.detectWheel = function () {
        return 'onwheel' in document.createElement('div') ?
            'wheel' :
            document.onmousewheel !== undefined ?
                'mousewheel' :
                'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox
    };
    return WhatInput;
}());
exports.WhatInput = WhatInput;
exports.whatInput = function () {
    if ('addEventListener' in window && Array.prototype.indexOf) {
        return new WhatInput();
    }
}();
window["whatInput"] = exports.whatInput;
