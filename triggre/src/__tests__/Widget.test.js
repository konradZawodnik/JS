import Widget from "../Widget.js";

describe("Widget Class", () => {
    let widget;
    let target;

    beforeEach(() => {
        widget = new Widget();
        target = document.createElement("div");
    });

    afterEach(() => {
        widget = null;
        target = null;
    });

    test("should initialize with `initialized` set to false", () => {
        expect(widget.initialized).toBeFalsy();
    });

    test("should add initializing class and then initialized class on init", async() => {
        const done = jest.fn();
        await widget.init(target, done);
        expect(target.classList.contains("widget-initializing")).toBeTruthy();

        setTimeout(() => {
            expect(target.classList.contains("widget-initializing")).toBeFalsy();
            expect(target.classList.contains("widget-initialized")).toBeTruthy();
            expect(done).toHaveBeenCalled();
        }, 1000);
    });

    test("should set `initialized` to true after init", async() => {
        const done = jest.fn();
        await widget.init(target, done);
        jest.useFakeTimers(1000);

        expect(widget.initialized).toBeTruthy();
    });

    test('should remove "widget-initialized" class and set `initialized` to false on destroy', () => {
        target.classList.add("widget-initialized");
        widget.initialized = true;
        widget.destroy(target);

        expect(target.classList.contains("widget-initialized")).toBeFalsy();
        expect(widget.initialized).toBeFalsy();
    });
});