declare type whatInputTypes = "mouse" | "keyboard" | "touch" | "initial";
declare type whatInputAskParam = "loose" | "strict";
declare const whatInput: {
    ask(opt?: whatInputAskParam): whatInputTypes;
    types(): whatInputTypes[];
    ignoreKeys(arr: number[]): void;
    registerOnChange(fn: Function, eventType: "input" | "intent"): void;
    unRegisterOnChange(fn: Function): void;
};
