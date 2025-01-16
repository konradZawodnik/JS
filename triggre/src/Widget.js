class Widget {
    constructor() {
        this.initialized = false;
    }

    async init(target, done) {
        target.classList.add("widget-initializing");
        this.initialized = true;
        setTimeout(() => {
            target.classList.remove("widget-initializing");
            target.classList.add("widget-initialized");
            done();
        }, 1000);
    }

    destroy(target) {
        this.initialized = false;
        target.classList.remove("widget-initializing");
        target.classList.remove("widget-initialized");
    }
}

export default Widget;