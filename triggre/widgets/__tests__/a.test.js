import WidgetA from "../a.js";

jest.mock("../../src/Widget.js", () => {
    return class Widget {
        init(target, done) {
            if (done) done();
        }
    };
});

describe("WidgetA", () => {
    let widgetA;
    let target;
    let done;

    beforeEach(() => {
        widgetA = new WidgetA();
        target = document.createElement("div");
        done = jest.fn();
    });

    test("should call the base class init method", async() => {
        const initSpy = jest.spyOn(WidgetA.prototype, "init");
        await widgetA.init(target, done);
        expect(initSpy).toHaveBeenCalledWith(target, done);
    });

    test("should add 'widget-a' class to target after 1 second", () => {
        jest.useFakeTimers();

        widgetA.init(target, done);
        expect(target.classList.contains("widget-a")).toBeFalsy();
        jest.advanceTimersByTime(1000);
        expect(target.classList.contains("widget-a")).toBeTruthy();

        jest.useRealTimers();
    });

    test("should call the done callback after 1 second", () => {
        jest.useFakeTimers();

        widgetA.init(target, done);
        jest.advanceTimersByTime(1000);
        expect(done).toHaveBeenCalled();

        jest.useRealTimers();
    });
});