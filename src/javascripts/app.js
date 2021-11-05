import { nodeOps } from './nodeOps.js';
import { createVNode, patch } from './renderer.js';
import { reactive, effect } from './reactive.js';

function createApp(args) {
    const { data, methods, render } = args;

    const app = {};

    const rawData = data();

    app.methods = methods;

    app.data = reactive(rawData);

    app.mount = createMountFn(app, render);

    return app;
}

function createMountFn(app, render) {
    return function(selector) {
        const container = nodeOps.qs(selector);
        app.vnode = createVNode();
        effect(() => {
            const nextVNode = render.call(app);
            patch(app.vnode, nextVNode, container);
            app.vnode = nextVNode;
        }, { lazy: true })

    }
}

export { nextTick } from './scheduler.js';
export { createApp, createVNode as h };
