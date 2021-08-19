import { Component, createRenderer } from "@vue/runtime-dom";
import App from "./App.vue";
import { canvas } from './Canvas'
import { nodeOps } from './utils/nodeOps'

const renderer = createRenderer(nodeOps);

function createCanvasApp(App: Component) {
    const app = renderer.createApp(App);
    const mount = app.mount;

    app.mount = function (el: String) {
        canvas.width = window.innerWidth - 20;
        canvas.height = window.innerHeight - 20;
        document.querySelector(el).appendChild(canvas);
        mount(canvas);
    };

    return app;
}

const canvasApp = createCanvasApp(App)

canvasApp.mount("#app");
