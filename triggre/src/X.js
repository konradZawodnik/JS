class X {
    constructor(resolver = null) {
        this.resolver = resolver || ((widgetPath) =>
            import (widgetPath));
        this.widgetInstances = new Map();
    }

    async init(target, callback) {
        try {
            await this.initWidget(target);
            callback(null);
        } catch (err) {
            callback(err);
        }
    }

    async initWidget(node) {
        if (node.hasAttribute("widget") && !this.widgetInstances.has(node)) {
            const widgetPath = node.getAttribute("widget");
            const widget = await this.loadWidget(widgetPath);
            const errors = [];
            const done = (error) => {
                if (error) {
                    errors.push(error);
                }
            };
            await widget.init(node, done);
            this.widgetInstances.set(node, widget);
        }

        for (const child of node.children) {
            await this.initWidget(child);
        }
    }

    async loadWidget(widgetPath) {
        const WidgetClass = await this.resolver(widgetPath);
        return new WidgetClass();
    }

    destroy(target) {
        this.destroyWidget(target);
    }

    destroyWidget(node) {
        if (this.widgetInstances.has(node)) {
            const widget = this.widgetInstances.get(node);
            widget.destroy(node);
            this.widgetInstances.delete(node);
        }

        for (const child of node.children) {
            this.destroyWidget(child);
        }
    }
}

export default X;