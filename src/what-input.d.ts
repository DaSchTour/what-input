import { Subject } from "rxjs";
export declare type whatInputTypes = "mouse" | "keyboard" | "touch" | "initial";
export declare type whatInputAskParam = "loose" | "strict";
export declare class WhatInput {
    private docElem;
    private currentInput;
    private currentIntent;
    private formInputs;
    private ignoreMap;
    private inputMap;
    private _inputTypes;
    private isBuffering;
    private pointerMap;
    private touchTimer;
    watch: Subject<whatInputTypes>;
    constructor();
    ask(opt?: whatInputAskParam): whatInputTypes;
    readonly inputTypes: whatInputTypes[];
    private setInput();
    private addListeners();
    private updateInput(event);
    private setIntent(event);
    private touchBuffer(event);
    private pointerType(event);
    private detectWheel();
}
export declare const whatInput: WhatInput;
