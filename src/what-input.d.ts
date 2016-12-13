declare type whatInputTypes = "mouse" | "keyboard" | "touch" | "initial";
declare type whatInputAskParam = "loose" | "strict";
declare const whatInput: {
    ask(opt?: whatInputAskParam): whatInputTypes;
    types(): whatInputTypes[];
};
