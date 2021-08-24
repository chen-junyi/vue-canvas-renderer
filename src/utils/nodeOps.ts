import { RendererOptions } from "vue";
import { draw } from "./draw";
import { ctx } from "../Canvas";

const nodeOps: RendererOptions = {
  // 创建元素会调用此方法
  createElement: (tag: string) => {
    console.log("createElement", tag);
    return { tag };
  },
  // 元素插入到页面中会调用此方法
  insert: (el: any, parent = { childs: [] }) => {
    console.log("insert", el);
    if (!el) return;
    el.parent = parent;
    if (!parent.childs) {
      // 格式化父子关系
      parent.childs = [el];
    } else {
      parent.childs.push(el);
    }
    draw(el); // 开始绘图
    if (el.onClick) {
      ctx.canvas.addEventListener("click", () => {
        el.onClick();
        draw(el, true);
      });
    }
  },
  // 每次更新属性会调用此方法
  patchProp(el: any, key: string, prevValue: any, nextValue: any) {
    // console.log("patchProp", key, prevValue, nextValue);
    el[key] = nextValue;
    // 赋值oldXY，更新属性时， 用于清空画布用
    el.oldXY = {
      x: el.x,
      y: el.y,
      [key]: prevValue,
    };
    if (prevValue !== null) {
      draw(el, true);
    }
  },
  // 移除元素
  remove: (el: any) => {
    console.log("remove", el);
    clear(el);
  },
  createText: (text: string) => {
    // console.log('createText', text)
  },
  createComment: (text) => {},
  setText: (node, text) => {},
  setElementText: (el, text) => {},
  parentNode: (node) => {
    // console.log('parentNode', node)
  },
  nextSibling: (node) => {
    // console.log('nextSibling', node)
  },
  querySelector: (selector) => {
    // console.log('querySelector', selector)
  },
  setScopeId(el, id) {},
  cloneNode(el) {
    // console.log('cloneNode', el)
  },
  insertStaticContent(content, parent, anchor, isSVG) {},
};

const clear = (el) => {
  const { x, y, w, h } = el;
  ctx.clearRect(x, y, w, h);
};

export { nodeOps };
