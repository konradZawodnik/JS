import Widget from "../src/Widget.js";

export default class WidgetC extends Widget {
    async init(target, done) {
        super.init(target, done);
        setTimeout(() => {
            target.classList.add("widget-c");
            done();
        }, 1000);
    }
}