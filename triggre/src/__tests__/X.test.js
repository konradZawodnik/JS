import X from "../X.js";

class MockWidget {
    async init(node, callback) {
        setTimeout(() => {
            if (node.hasAttribute("fail")) {
                callback(new Error("Initialization failed"));
            } else {
                callback(null);
            }
        }, 10);
    }

    destroy(node) {
        node.setAttribute("destroyed", "true");
    }
}

describe("Class X", () => {
    let instance;

    beforeEach(() => {
        instance = new X((widgetPath) => {
            if (widgetPath === "mock/widget/path") {
                return Promise.resolve(MockWidget);
            }
            return Promise.reject(new Error("Widget not found"));
        });
    });

    it("init successfully initializes a widget", async() => {
        const node = document.createElement("div");
        node.setAttribute("widget", "mock/widget/path");

        const callback = jest.fn();
        await instance.init(node, callback);

        expect(callback).toHaveBeenCalledWith(null);
        expect(instance.widgetInstances.has(node)).toBe(true);
    });

    it("init calls catch block when initWidget throws an error", async() => {
        const node = document.createElement("div");
        const callback = jest.fn();

        jest.spyOn(instance, "initWidget").mockImplementation(() => {
            throw new Error("Mocked initWidget error");
        });

        await instance.init(node, callback);

        expect(callback).toHaveBeenCalledWith(expect.any(Error));
        expect(callback.mock.calls[0][0].message).toBe("Mocked initWidget error");

        instance.initWidget.mockRestore();
    });

    it("initWidget initializes widgets for child nodes", async() => {
        const parentNode = document.createElement("div");
        const childNode = document.createElement("div");
        childNode.setAttribute("widget", "mock/widget/path");
        parentNode.appendChild(childNode);

        await instance.initWidget(parentNode);

        expect(instance.widgetInstances.has(childNode)).toBe(true);
    });

    it("loadWidget loads a widget class via resolver", async() => {
        const widget = await instance.loadWidget("mock/widget/path");

        expect(widget).toBeInstanceOf(MockWidget);
    });

    it("loadWidget throws an error for an unknown widget path", async() => {
        await expect(instance.loadWidget("unknown/path")).rejects.toThrow("Widget not found");
    });

    it("destroy removes widget instances and calls destroy on widgets", () => {
        const node = document.createElement("div");
        node.setAttribute("widget", "mock/widget/path");
        const widget = new MockWidget();

        instance.widgetInstances.set(node, widget);
        instance.destroy(node);

        expect(instance.widgetInstances.has(node)).toBe(false);
        expect(node.getAttribute("destroyed")).toBe("true");
    });

    it("destroyWidget recursively destroys child widgets", () => {
        const parentNode = document.createElement("div");
        const childNode = document.createElement("div");
        parentNode.appendChild(childNode);

        const parentWidget = new MockWidget();
        const childWidget = new MockWidget();

        instance.widgetInstances.set(parentNode, parentWidget);
        instance.widgetInstances.set(childNode, childWidget);
        instance.destroy(parentNode);

        expect(instance.widgetInstances.has(parentNode)).toBe(false);
        expect(instance.widgetInstances.has(childNode)).toBe(false);
        expect(parentNode.getAttribute("destroyed")).toBe("true");
        expect(childNode.getAttribute("destroyed")).toBe("true");
    });
});