import Widget from "../src/Widget.js";

export default class WidgetB extends Widget {
    async init(target, done) {
        super.init(target, done);
        setTimeout(() => {
            target.classList.add("widget-b");
            done();
        }, 1000);
    }
}