import WidgetB from "../a.js";

jest.mock("../../src/Widget.js", () => {
    return class Widget {
        init(target, done) {
            if (done) done();
        }
    };
});

describe("WidgetB", () => {
    let widgetB;
    let target;
    let done;

    beforeEach(() => {
        widgetB = new WidgetB();
        target = document.createElement("div");
        done = jest.fn();
    });

    test("should call the base class init method", async() => {
        const initSpy = jest.spyOn(WidgetB.prototype, "init");
        await widgetB.init(target, done);
        expect(initSpy).toHaveBeenCalledWith(target, done);
    });

    test("should add 'widget-b' class to target after 1 second", () => {
        jest.useFakeTimers();

        widgetB.init(target, done);
        expect(target.classList.contains("widget-b")).toBeFalsy();
        setTimeout(() => {
            expect(target.classList.contains("widget-b")).toBeTruthy();
        }, 1000);

        jest.useRealTimers();
    });

    test("should call the done callback after 1 second", () => {
        jest.useFakeTimers();

        widgetB.init(target, done);
        jest.advanceTimersByTime(1000);
        expect(done).toHaveBeenCalled();

        jest.useRealTimers();
    });
});