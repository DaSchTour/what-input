import { Subject } from "rxjs";

export type whatInputTypes = "mouse" | "keyboard" | "touch" | "initial";
type _whatInputTypes = "mouse" | "keyboard" | "touch" | "initial"  | "pointer";
export type whatInputAskParam = "loose" | "strict";

function* inputMapGenerator(): Iterable<[string, _whatInputTypes]>  {
  yield ['keyup', 'keyboard'];
  yield ['mousedown', 'mouse'];
  yield ['mousemove', 'mouse'];
  yield ['MSPointerDown', 'pointer'];
  yield ['MSPointerMove', 'pointer'];
  yield ['pointerdown', 'pointer'];
  yield ['pointermove', 'pointer'];
  yield ['touchstart', 'touch'];
}

export class WhatInput {

  /*
    ---------------
    Variables
    ---------------
  */

  // cache document.documentElement
  private docElem = document.documentElement;

  // last used input type
  private currentInput: whatInputTypes = 'initial';

  // last used input intent
  private currentIntent: whatInputTypes = null;

  // form input types
  private formInputs = [
    'input',
    'select',
    'textarea'
  ];

  // list of modifier keys commonly used with the mouse and
  // can be safely ignored to prevent false keyboard detection
  private ignoreMap = [
    16, // shift
    17, // control
    18, // alt
    91, // Windows key / left Apple cmd
    93  // Windows menu / right Apple cmd
  ];

  // mapping of events to input types
  private inputMap: Map<string, _whatInputTypes>;

  // array of all used input types
  private _inputTypes: Array<whatInputTypes> = [];

  // boolean: true if touch buffer timer is running
  private isBuffering = false;

  // map of IE 10 pointer events
  private pointerMap = {
    2: 'touch',
    3: 'touch', // treat pen like touch
    4: 'mouse'
  };

  // touch buffer timer
  private touchTimer = null;

  public watch: Subject<whatInputTypes>;

  constructor() {

    this.inputMap = new Map<string, _whatInputTypes>(inputMapGenerator());
    // add correct mouse wheel event mapping to `inputMap`
    this.inputMap.set(this.detectWheel(), 'mouse');

    if (typeof Subject !== "undefined") {
      this.watch = new Subject<whatInputTypes>();
    }

    this.addListeners();
    this.setInput();
  }

  // returns string: the current input type
  // opt: 'loose'|'strict'
  // 'strict' (default): returns the same value as the `data-whatinput` attribute
  // 'loose': includes `data-whatintent` value if it's more current than `data-whatinput`
  public ask(opt: whatInputAskParam = "strict") {
    return (opt === 'loose') ? this.currentIntent : this.currentInput;
  }

  // returns array: all the detected input types
  get inputTypes() {
    return this._inputTypes;
  }

  // updates the doc and `inputTypes` array with new input
  private setInput() {
    if (typeof this.watch !== "undefined") {
      this.watch.next(this.currentInput);
    }
    this.docElem.setAttribute('data-whatinput', this.currentInput);
    this.docElem.setAttribute('data-whatintent', this.currentInput);

    if (this.inputTypes.indexOf(this.currentInput) === -1) {
      this.inputTypes.push(this.currentInput);
      this.docElem.className += ' whatinput-types-' + this.currentInput;
    }
  }

  /*
    ---------------
    Events
    ---------------
  */

  private addListeners() {

    // `pointermove`, `MSPointerMove`, `mousemove` and mouse wheel event binding
    // can only demonstrate potential, but not actual, interaction
    // and are treated separately

    // pointer events (mouse, pen, touch)
    if (window["PointerEvent"]) {
      this.docElem.addEventListener('pointerdown', (event) => this.updateInput(event));
      this.docElem.addEventListener('pointermove', (event) => this.setIntent(event));
    } else if (window["MSPointerEvent"]) {
      this.docElem.addEventListener('MSPointerDown', (event) => this.updateInput(event));
      this.docElem.addEventListener('MSPointerMove', (event) => this.setIntent(event));
    } else {

      // mouse events
      this.docElem.addEventListener('mousedown', (event) => this.updateInput(event));
      this.docElem.addEventListener('mousemove', (event) => this.setIntent(event));

      // touch events
      if ('ontouchstart' in window) {
        this.docElem.addEventListener('touchstart', (event) => this.touchBuffer(event));
      }
    }

    // mouse wheel
    this.docElem.addEventListener(this.detectWheel(), (event: MouseEvent) => this.setIntent(event));

    // keyboard events
    this.docElem.addEventListener('keydown', (event) => this.updateInput(event));
    this.docElem.addEventListener('keyup', (event) => this.updateInput(event));
  }

  // checks conditions before updating new input
  private updateInput(event: MouseEvent | KeyboardEvent | TouchEvent) {

    // only execute if the touch buffer timer isn't running
    if (!this.isBuffering) {
      let eventKey = event["which"];
      let value = this.inputMap.get(event.type);
      if (value === 'pointer') value = this.pointerType(event);

      const valueChanged = this.currentInput !== value || this.currentIntent !== value;

      if (valueChanged) {
        const activeElem = document.activeElement;
        const activeInput = activeElem instanceof HTMLInputElement || activeElem instanceof HTMLSelectElement || activeElem instanceof HTMLTextAreaElement;
        const setChange =
          value === 'touch' ||
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
  }

  // updates input intent for `mousemove` and `pointermove`
  private setIntent(event: MouseEvent) {

    // only execute if the touch buffer timer isn't running
    if (!this.isBuffering) {
      let value = this.inputMap.get(event.type);
      if (value === 'pointer') value = this.pointerType(event);

      if (this.currentIntent !== value) {
        this.currentIntent = value;

        this.docElem.setAttribute('data-whatintent', this.currentIntent);
      }
    }
  }

  // buffers touch events because they frequently also fire mouse events
  private touchBuffer(event: TouchEvent) {

    // clear the timer if it happens to be running
    window.clearTimeout(this.touchTimer);

    // set the current input
    this.updateInput(event);

    // set the isBuffering to `true`
    this.isBuffering = true;

    // run the timer
    this.touchTimer = window.setTimeout(() => {
      // if the timer runs out, set isBuffering back to `false`
      this.isBuffering = false;
    }, 200);
  }

  /*
    ---------------
    Utilities
    ---------------
  */

  private pointerType(event): whatInputTypes {
    if (typeof event.pointerType === 'number') {
      return this.pointerMap[event.pointerType];
    } else {
      return (event.pointerType === 'pen') ? 'touch' : event.pointerType; // treat pen like touch
    }
  }

  // detect version of mouse wheel event to use
  // via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
  private detectWheel(): "wheel" | "mousewheel" | "DOMMouseScroll" {
    return 'onwheel' in document.createElement('div') ?
      'wheel' : // Modern browsers support "wheel"

      document.onmousewheel !== undefined ?
        'mousewheel' : // Webkit and IE support at least "mousewheel"
        'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox
  }
}

export const whatInput = function () {
  if ('addEventListener' in window && Array.prototype.indexOf) {
    return new WhatInput();
  }
}();

window["whatInput"] = whatInput;
