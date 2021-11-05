import { nodeOps } from './nodeOps.js';
import { createApp, h, nextTick } from "./app.js";
import { createAppArg } from "./createApp.js";

let passLength;

function getRandomPass(length) {

    const number = '0123456789';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const symbol = '!#$%&=_/*@-+?';

    let str = '';
    const options = document.querySelectorAll('input[name="option"]');
    for(let i=0; i<options.length; i++) {
        if(options[i].checked) {
            if(options[i].value === 'number') {
                str += number;
            } else if (options[i].value === 'lowerCase') {
                str += lowerCase;
            } else if (options[i].value === 'upperCase') {
                str += upperCase;
            } else if (options[i].value === 'symbol') {
                str += symbol;
            }
        }
    }

    passLength = length;

    let password = '';
    for (let i = 0; i < passLength; i++) {
        password += str.charAt(Math.floor(Math.random() * str.length));
    }
    return password;
}

const changeBtn = nodeOps.qs(".change");
nodeOps.on(changeBtn, "click", () => {

    const removeElem = nodeOps.qs('.container');
    removeElem.remove();

    createApp(createAppArg(passLength, 16, 1)).mount("#app");

});

export { getRandomPass };
