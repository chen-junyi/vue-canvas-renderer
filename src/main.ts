import {
  Component,
  createRenderer,
  Renderer,
  App,
  ComponentPublicInstance,
} from "@vue/runtime-dom";
import AppComp from "./App.vue";
import { canvas } from "./Canvas";
import { nodeOps } from "./utils/nodeOps";

const renderer: Renderer = createRenderer(nodeOps);

function createCanvasApp(AppComp: Component) {
  const app: App = renderer.createApp(AppComp);
  const mount = app.mount;

  app.mount = function (el: string): ComponentPublicInstance | any {
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
    const htmlEle = document.querySelector(el);
    if (htmlEle) {
      htmlEle.appendChild(canvas);
    } else {
      return console.error("找不到传入的DOM元素");
    }
    return mount(canvas);
  };

  return app;
}

const canvasApp = createCanvasApp(AppComp);

canvasApp.mount("#app");
