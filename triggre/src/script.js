import X from "./X.js";
import WidgetA from "../widgets/a.js";
import WidgetB from "../widgets/b.js";
import WidgetC from "../widgets/c.js";

const widgetLib = new X();
const root = document.getElementById("root");
let selectedNode;

widgetLib.resolver = async(widgetPath) => {
    switch (widgetPath) {
        case "widgets/a":
            return WidgetA;
        case "widgets/b":
            return WidgetB;
        case "widgets/c":
            return WidgetC;
        default:
            throw new Error(`Widget not found: ${widgetPath}`);
    }
};

const initBtn = document.getElementById("initBtn");
initBtn.addEventListener("click", async() => {
    const callback = (err) => {
        const status = err ? "Failed" : "Initialized";
        document.getElementById("status-info").textContent = `Status: ${status}`;
        if (!err) {
            root.classList.add("widget-initialized");
            root.classList.remove('widget-done');
            root.classList.remove('widget-failed');
            root.classList.remove('widget-destroyed');
        } else {
            root.classList.add("widget-failed");
            root.classList.remove('widget-done');
            root.classList.remove('widget-initialized');
            root.classList.remove('widget-destroyed');
        }
        return err;
    };
    try {
        await widgetLib.init(root, callback);
    } catch (err) {
        callback(true);
        return err;
    }
});

const destroyBtn = document.getElementById("destroyBtn");
destroyBtn.addEventListener("click", () => {
    widgetLib.destroy(root);
    root.classList.add('widget-destroyed');
    document.getElementById("status-info").textContent = "Status: Destroyed";
    root.classList.remove("widget-initialized", "widget-failed", "widget-done");
});

const doneBtn = document.getElementById("doneBtn");
doneBtn.addEventListener("click", () => {
    root.classList.add("widget-done");
    document.getElementById("status-info").textContent = "Status: Done";
    root.classList.remove("widget-initialized", "widget-failed", "widget-destroyed");
});

const failBtn = document.getElementById("failBtn");
failBtn.addEventListener("click", () => {
    root.classList.add("widget-failed");
    document.getElementById("status-info").textContent = "Status: Failed";
    root.classList.remove("widget-initialized", "widget-done", "widget-destroyed");
});

document.getElementById("root").addEventListener("click", (e) => {
    root.childNodes.forEach((item) => {
        if (item.classList && item.classList.length) {
            return item.classList.remove("selected");
        }
    });
    selectedNode = e.target;
    document.getElementById("node-info").textContent =
        selectedNode.innerText.split("\n").length > 1 ?
        `Selected node: ${selectedNode.innerText.split("\n").shift()}` :
        `Selected node: ${selectedNode.innerText}`;
});