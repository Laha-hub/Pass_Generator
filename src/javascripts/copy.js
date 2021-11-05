import { nodeOps } from './nodeOps.js';

nodeOps.on(window, "DOMContentLoaded", event => {

    const copyBtn = nodeOps.qs(".copy");
    const popup = nodeOps.qs(".popup");

    function copy(pass) {
        navigator.clipboard
            .writeText(pass.innerText)
            .then(() => {
                flushPopup();
            })
    }

    nodeOps.on(copyBtn, "click", () => {
        const password = nodeOps.qs(".password");
        copy(password);
    });

    function flushPopup() {
        nodeOps.html(popup, 'COPIED!!');
        setTimeout(() => {
            nodeOps.html(popup, '&nbsp;');
        }, 700);
    }

});

