/**
 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
 * @version v5.0.0
 * @link https://github.com/DaSchTour/what-input
 * @license MIT
 */
!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==typeof c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function r(e,r){for(var n=e.split(".");n.length;)r=r[n.shift()];return r}function n(n){if("string"==typeof n)return r(n,e);if(!(n instanceof Array))throw new Error("Global exports must be a string or array.");for(var t={},o=!0,f=0;f<n.length;f++){var i=r(n[f],e);o&&(t["default"]=i,o=!1),t[n[f].split(".").pop()]=i}return t}function t(r){if(Object.keys)Object.keys(e).forEach(r);else for(var n in e)a.call(e,n)&&r(n)}function o(r){t(function(n){if(-1==l.call(s,n)){try{var t=e[n]}catch(o){s.push(n)}r(n,t)}})}var f,i=$__System,a=Object.prototype.hasOwnProperty,l=Array.prototype.indexOf||function(e){for(var r=0,n=this.length;n>r;r++)if(this[r]===e)return r;return-1},s=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];i.set("@@global-helpers",i.newModule({prepareGlobal:function(r,t,i){var a=e.define;e.define=void 0;var l;if(i){l={};for(var s in i)l[s]=e[s],e[s]=i[s]}return t||(f={},o(function(e,r){f[e]=r})),function(){var r;if(t)r=n(t);else{r={};var i,s;o(function(e,n){f[e]!==n&&"undefined"!=typeof n&&(r[e]=n,"undefined"!=typeof i?s||i===n||(s=!0):i=n)}),r=s?r:i}if(l)for(var u in l)e[u]=l[u];return e.define=a,r}}}))}("undefined"!=typeof self?self:global);
$__System.registerDynamic('1', [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = $__System.get("@@global-helpers").prepareGlobal($__module.id, null, null);

    (function ($__global) {
        var whatInput = $__global['whatInput'];
        var whatInput = function () {
            /*
              ---------------
              Variables
              ---------------
            */
            // cache document.documentElement
            var docElem = document.documentElement;
            // last used input type
            var currentInput = 'initial';
            // last used input intent
            var currentIntent = null;
            // form input types
            var formInputs = ['input', 'select', 'textarea'];
            // list of modifier keys commonly used with the mouse and
            // can be safely ignored to prevent false keyboard detection
            var ignoreMap = [16, 17, 18, 91, 93 // Windows menu / right Apple cmd
            ];
            // mapping of events to input types
            var inputMap = {
                'keyup': 'keyboard',
                'mousedown': 'mouse',
                'mousemove': 'mouse',
                'MSPointerDown': 'pointer',
                'MSPointerMove': 'pointer',
                'pointerdown': 'pointer',
                'pointermove': 'pointer',
                'touchstart': 'touch'
            };
            // array of all used input types
            var inputTypes = [];
            // boolean: true if touch buffer timer is running
            var isBuffering = false;
            // map of IE 10 pointer events
            var pointerMap = {
                2: 'touch',
                3: 'touch',
                4: 'mouse'
            };
            // touch buffer timer
            var touchTimer = null;
            /*
              ---------------
              Set up
              ---------------
            */
            var setUp = function () {
                // add correct mouse wheel event mapping to `inputMap`
                inputMap[detectWheel()] = 'mouse';
                addListeners();
                setInput();
            };
            /*
              ---------------
              Events
              ---------------
            */
            var addListeners = function () {
                // `pointermove`, `MSPointerMove`, `mousemove` and mouse wheel event binding
                // can only demonstrate potential, but not actual, interaction
                // and are treated separately
                // pointer events (mouse, pen, touch)
                if (window["PointerEvent"]) {
                    docElem.addEventListener('pointerdown', updateInput);
                    docElem.addEventListener('pointermove', setIntent);
                } else if (window["MSPointerEvent"]) {
                    docElem.addEventListener('MSPointerDown', updateInput);
                    docElem.addEventListener('MSPointerMove', setIntent);
                } else {
                    // mouse events
                    docElem.addEventListener('mousedown', updateInput);
                    docElem.addEventListener('mousemove', setIntent);
                    // touch events
                    if ('ontouchstart' in window) {
                        docElem.addEventListener('touchstart', touchBuffer);
                    }
                }
                // mouse wheel
                docElem.addEventListener(detectWheel(), setIntent);
                // keyboard events
                docElem.addEventListener('keydown', updateInput);
                docElem.addEventListener('keyup', updateInput);
            };
            // checks conditions before updating new input
            var updateInput = function (event) {
                // only execute if the touch buffer timer isn't running
                if (!isBuffering) {
                    var eventKey = event.which;
                    var value = inputMap[event.type];
                    if (value === 'pointer') value = pointerType(event);
                    if (currentInput !== value || currentIntent !== value) {
                        var activeInput = document.activeElement && formInputs.indexOf(document.activeElement.nodeName.toLowerCase()) === -1 ? true : false;
                        if (value === 'touch' ||
                        // ignore mouse modifier keys
                        value === 'mouse' && ignoreMap.indexOf(eventKey) === -1 ||
                        // don't switch if the current element is a form input
                        value === 'keyboard' && activeInput) {
                            // set the current and catch-all variable
                            currentInput = currentIntent = value;
                            setInput();
                        }
                    }
                }
            };
            // updates the doc and `inputTypes` array with new input
            var setInput = function () {
                docElem.setAttribute('data-whatinput', currentInput);
                docElem.setAttribute('data-whatintent', currentInput);
                if (inputTypes.indexOf(currentInput) === -1) {
                    inputTypes.push(currentInput);
                    docElem.className += ' whatinput-types-' + currentInput;
                }
            };
            // updates input intent for `mousemove` and `pointermove`
            var setIntent = function (event) {
                // only execute if the touch buffer timer isn't running
                if (!isBuffering) {
                    var value = inputMap[event.type];
                    if (value === 'pointer') value = pointerType(event);
                    if (currentIntent !== value) {
                        currentIntent = value;
                        docElem.setAttribute('data-whatintent', currentIntent);
                    }
                }
            };
            // buffers touch events because they frequently also fire mouse events
            var touchBuffer = function (event) {
                // clear the timer if it happens to be running
                window.clearTimeout(touchTimer);
                // set the current input
                updateInput(event);
                // set the isBuffering to `true`
                isBuffering = true;
                // run the timer
                touchTimer = window.setTimeout(function () {
                    // if the timer runs out, set isBuffering back to `false`
                    isBuffering = false;
                }, 200);
            };
            /*
              ---------------
              Utilities
              ---------------
            */
            var pointerType = function (event) {
                if (typeof event.pointerType === 'number') {
                    return pointerMap[event.pointerType];
                } else {
                    return event.pointerType === 'pen' ? 'touch' : event.pointerType; // treat pen like touch
                }
            };
            // detect version of mouse wheel event to use
            // via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
            var detectWheel = function () {
                return 'onwheel' in document.createElement('div') ? 'wheel' : document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox
            };
            /*
              ---------------
              Init
                 don't start script unless browser cuts the mustard
              (also passes if polyfills are used)
              ---------------
            */
            if ('addEventListener' in window && Array.prototype.indexOf) {
                setUp();
            }
            /*
              ---------------
              API
              ---------------
            */
            return {
                // returns string: the current input type
                // opt: 'loose'|'strict'
                // 'strict' (default): returns the same value as the `data-whatinput` attribute
                // 'loose': includes `data-whatintent` value if it's more current than `data-whatinput`
                ask: function (opt) {
                    if (opt === void 0) {
                        opt = "strict";
                    }
                    return opt === 'loose' ? currentIntent : currentInput;
                },
                // returns array: all the detected input types
                types: function () {
                    return inputTypes;
                }
            };
        }();
        $__global['whatInput'] = whatInput;
    })(this);

    return _retrieveGlobal();
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});