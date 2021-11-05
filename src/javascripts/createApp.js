import { createApp, h, nextTick } from "./app.js";
import { getRandomPass } from "./random.js";

createApp(createAppArg(1, 16, 1)).mount("#app");

function createAppArg(digit, max, min = 1) {
    return {
        data: () => ({
            digit,
        }),

        methods: {
            increment(key) {
                if(this.data[key] < max) {
                    nextTick(this.data[key]++);
                } else {
                    return;
                }
            },
            decrement(key) {
                if(this.data[key] > min) {
                    nextTick(this.data[key]--);
                } else {
                    return;
                }
            },
        },

        render() {
            return h("div", { class: "container" }, [
                    h("div", { class: "chars" }, this.data.digit + ` chars ( max ${max} )`),
                    h("button", { class: "pass_btn", onClick: () => this.methods.increment.call(this, 'digit') }, "+"),
                    h("div", { class: "password" }, getRandomPass(this.data.digit)),
                    h("button", { class: "pass_btn", onClick: () => this.methods.decrement.call(this, 'digit') }, "&minus;"),
            ]);
        },
    }
}

export { createAppArg };
