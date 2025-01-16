import WidgetC from "../a.js";

jest.mock("../../src/Widget.js", () => {
    return class Widget {
        init(target, done) {
            if (done) done();
        }
    };
});

describe("WidgetC", () => {
    let widgetC;
    let target;
    let done;

    beforeEach(() => {
        widgetC = new WidgetC();
        target = document.createElement("div");
        done = jest.fn();
    });

    test("should call the base class init method", async() => {
        const initSpy = jest.spyOn(WidgetC.prototype, "init");
        await widgetC.init(target, done);
        expect(initSpy).toHaveBeenCalledWith(target, done);
    });

    test("should add 'widget-c' class to target after 1 second", () => {
        jest.useFakeTimers();

        widgetC.init(target, done);
        expect(target.classList.contains("widget-c")).toBeFalsy();
        setTimeout(() => {
            expect(target.classList.contains("widget-c")).toBeTruthy();
        }, 1000);

        jest.useRealTimers();
    });

    test("should call the done callback after 1 second", () => {
        jest.useFakeTimers();

        widgetC.init(target, done);
        jest.advanceTimersByTime(1000);
        expect(done).toHaveBeenCalled();

        jest.useRealTimers();
    });
});