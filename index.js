import { registerCard, registerNamespace, run } from './main';

export function doc(str) {
    return {
        isDoc: true,
        text: str.join("\n")
    };
}

export {
    registerCard as card,
    registerNamespace as ns,
    run
};
