import Widget from "../src/Widget.js";

export default class WidgetA extends Widget {
    async init(target, done) {
        super.init(target, done);
        setTimeout(() => {
            target.classList.add("widget-a");
            done();
        }, 1000);
    }
}