var whatInput = function () {
    /*
      ---------------
      Variables
      ---------------
    */
    var _this = this;
    // last used input type
    var currentInput = 'initial';
    // last used input intent
    var currentIntent = null;
    // cache document.documentElement
    var docElem = document.documentElement;
    // form input types
    var formInputs = [
        'input',
        'select',
        'textarea'
    ];
    var functionList = [];
    // list of modifier keys commonly used with the mouse and
    // can be safely ignored to prevent false keyboard detection
    var ignoreMap = [
        16,
        17,
        18,
        91,
        93 // Windows menu / right Apple cmd
    ];
    // list of keys for which we change intent even for form inputs
    var changeIntentMap = [
        9 // tab
    ];
    // mapping of events to input types
    var inputMap = {
        'keydown': 'keyboard',
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
    // boolean: true if touch buffer is active
    var isBuffering = false;
    // boolean: true if the page is being scrolled
    var isScrolling = false;
    // store current mouse position
    var mousePos = {
        'x': null,
        'y': null
    };
    // map of IE 10 pointer events
    var pointerMap = {
        2: 'touch',
        3: 'touch',
        4: 'mouse'
    };
    var supportsPassive = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassive = true;
            }
        });
        window.addEventListener('test', null, opts);
    }
    catch (e) { }
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
        var options = supportsPassive ? { passive: true } : false; // Type Definition isn't up to spec so we set this to any
        // pointer events (mouse, pen, touch)
        if (window["PointerEvent"]) {
            docElem.addEventListener('pointerdown', updateInput);
            docElem.addEventListener('pointermove', setIntent);
        }
        else if (window["MSPointerEvent"]) {
            docElem.addEventListener('MSPointerDown', updateInput);
            docElem.addEventListener('MSPointerMove', setIntent);
        }
        else {
            // mouse events
            docElem.addEventListener('mousedown', updateInput);
            docElem.addEventListener('mousemove', setIntent);
            // touch events
            if ('ontouchstart' in window) {
                docElem.addEventListener('touchstart', touchBuffer, options);
                docElem.addEventListener('touchend', touchBuffer);
            }
        }
        // mouse wheel
        docElem.addEventListener(detectWheel(), setIntent, options);
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
            if (value === 'pointer') {
                value = pointerType(event);
            }
            if (currentInput !== value || currentIntent !== value) {
                var activeElem = document.activeElement;
                var activeInput = false;
                var notFormInput = activeElem && activeElem.nodeName && formInputs.indexOf(activeElem.nodeName.toLowerCase()) === -1;
                if (notFormInput || changeIntentMap.indexOf(eventKey) !== -1) {
                    activeInput = true;
                }
                if (value === 'touch' ||
                    // ignore mouse modifier keys
                    value === 'mouse' ||
                    // don't switch if the current element is a form input
                    (value === 'keyboard' &&
                        eventKey &&
                        activeInput &&
                        ignoreMap.indexOf(eventKey) === -1)) {
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
        fireFunctions('input');
    };
    // updates input intent for `mousemove` and `pointermove`
    var setIntent = function (event) {
        // test to see if `mousemove` happened relative to the screen
        // to detect scrolling versus mousemove
        if (mousePos['x'] !== event.screenX ||
            mousePos['y'] !== event.screenY) {
            isScrolling = false;
            mousePos['x'] = event.screenX;
            mousePos['y'] = event.screenY;
        }
        else {
            isScrolling = true;
        }
        // only execute if the touch buffer timer isn't running
        // or scrolling isn't happening
        if (!isBuffering && !isScrolling) {
            var value = inputMap[event.type];
            if (value === 'pointer')
                value = pointerType(event);
            if (currentIntent !== value) {
                currentIntent = value;
                docElem.setAttribute('data-whatintent', currentIntent);
                fireFunctions('intent');
            }
        }
    };
    // buffers touch events because they frequently also fire mouse events
    var touchBuffer = function (event) {
        if (event.type === 'touchstart') {
            isBuffering = false;
            // set the current input
            updateInput(event);
        }
        else {
            isBuffering = true;
        }
    };
    var fireFunctions = function (type) {
        for (var i = 0, len = functionList.length; i < len; i++) {
            if (functionList[i].type === type) {
                functionList[i].fn.call(_this, currentIntent);
            }
        }
    };
    /*
      ---------------
      Utilities
      ---------------
    */
    var pointerType = function (event) {
        if (typeof event.pointerType === 'number') {
            return pointerMap[event.pointerType];
        }
        else {
            return (event.pointerType === 'pen') ? 'touch' : event.pointerType; // treat pen like touch
        }
    };
    // detect version of mouse wheel event to use
    // via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
    var detectWheel = function () {
        var wheelType;
        // Modern browsers support "wheel"
        if ('onwheel' in document.createElement('div')) {
            wheelType = 'wheel';
        }
        else {
            // Webkit and IE support at least "mousewheel"
            // or assume that remaining browsers are older Firefox
            wheelType = document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';
        }
        return wheelType;
    };
    var objPos = function (match) {
        for (var i = 0, len = functionList.length; i < len; i++) {
            if (functionList[i].fn === match) {
                return i;
            }
        }
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
            if (opt === void 0) { opt = "strict"; }
            return (opt === 'loose') ? currentIntent : currentInput;
        },
        // returns array: all the detected input types
        types: function () { return inputTypes; },
        // overwrites ignored keys with provided array
        ignoreKeys: function (arr) {
            ignoreMap = arr;
        },
        // attach functions to input and intent "events"
        // funct: function to fire on change
        // eventType: 'input'|'intent'
        registerOnChange: function (fn, eventType) {
            functionList.push({
                fn: fn,
                type: eventType || 'input'
            });
        },
        unRegisterOnChange: function (fn) {
            var position = objPos(fn);
            if (position) {
                functionList.splice(position, 1);
            }
        }
    };
}();
