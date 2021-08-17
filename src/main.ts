import { createRenderer } from "@vue/runtime-dom";
import App from "./App.vue";
import {
    drawRect,
    drawCircle,
    drawEllipse,
    drawLine,
    fillText
} from './utils/canvasDraw'

const nodeOps = {
    // 创建元素会调用此方法
    createElement: (tag) => {
        console.log('createElement', tag);
        return { tag };
    },
    // 元素插入到页面中会调用此方法
    insert: (el, parent = {}) => {
        console.log('insert', el);
        if (!el) return
        el.parent = parent;
        if (!parent.childs) {
            // 格式化父子关系
            parent.childs = [el];
        } else {
            parent.childs.push(el);
        }
        draw(el); // 开始绘图
        if (el.onClick) {
            ctx.canvas.addEventListener(
                "click",
                () => {
                    el.onClick();
                    draw(el, true);
                });
        }
    },
    // 每次更新属性会调用此方法
    patchProp(el, key, prevValue, nextValue) {
        // console.log("patchProp", key, prevValue, nextValue);
        el[key] = nextValue;
        // 赋值oldXY，更新属性时， 用于清空画布用
        el.oldXY = {
            x: el.x,
            y: el.y,
            [key]: prevValue
        }
        if (prevValue !== null) {
            draw(el, true)
        }
    },
    // 移除元素
    remove: (el) => {
        console.log('remove', el);
        clear(el)
    },
    createText: (text) => {
        // console.log('createText', text)
    },
    createComment: (text) => { },
    setText: (node, text) => { },
    setElementText: (el, text) => { },
    parentNode: (node) => {
        // console.log('parentNode', node)
    },
    nextSibling: (node) => {
        // console.log('nextSibling', node)
    },
    querySelector: (selector) => {
        // console.log('querySelector', selector)
    },
    setScopeId(el, id) { },
    cloneNode(el) {
        // console.log('cloneNode', el)
    },
    insertStaticContent(content, parent, anchor, isSVG) { },
}



// 画画的逻辑
let canvas, ctx;
const gap = 20;
const draw = (el, clear = false) => {
    // console.log(el)
    // 清空画布
    // 判断tag
    if (el.tag === "BarChart") {
        const { w: width, h: height, x: elX, y: elY } = el
        if (clear) {
            ctx.clearRect(elX, elY, width, height);
        }
        const { data } = el;
        const barWidth = (width - gap * data.length) / data.length,
            paddingBottom = 20;
        // x轴
        // 柱状图
        data.forEach(({ title, count, color }, index) => {
            const x = elX + index * (barWidth + gap);
            const y = height - paddingBottom - count;
            ctx.fillStyle = color;
            ctx.fillRect(x, y, barWidth, count);
            ctx.fillStyle = "black";
            ctx.fillText(title, x + barWidth / 2 - 12, height);
        });
    }

    if (el.tag === 'Circle') {
        const { r, x, y, fillStyle, oldXY } = el
        if (clear) {
            ctx.clearRect(oldXY.x - r, oldXY.y - r, r * 2, r * 2);
        }
        drawCircle(ctx, x, y, r, fillStyle)
    }

    if (el.tag === 'Rect') {
        const { x, y, w, h, fillStyle } = el
        // if (clear) {
        //     ctx.clearRect(el.parent.oldXY.x + x, el.parent.oldXY.y + y, w, h);
        // }
        drawRect(ctx, x, y, w, h, fillStyle);
    }

    if (el.tag === 'Ellipse') {
        const { x, y, radiusX, radiusY } = el
        drawEllipse(ctx, x, y, radiusX, radiusY)
    }

    if (el.tag === 'Line') {
        const { x1, y1, x2, y2 } = el
        drawLine(ctx, x1, y1, x2, y2, 'blue')
    }

    if (el.tag === 'Text') {
        const { x, y, text, style = {} } = el
        fillText(ctx, x, y, text, style)
        console.log(el)
        // drawLine(ctx, x1, y1, x2, y2, 'blue')
    }

    // 递归绘制⼦节点
    // el.childs && el.childs.forEach((child) => draw(child, true));
};

const clear = el => {
    const { x, y, w, h } = el
    ctx.clearRect(x, y, w, h)
}

const renderer = createRenderer(nodeOps);

function createCanvasApp(App) {
    const app = renderer.createApp(App);
    const mount = app.mount;

    app.mount = function (sel) {
        canvas = document.createElement("canvas");
        canvas.width = window.innerWidth - 20;
        canvas.height = window.innerHeight - 20;
        document.querySelector(sel).appendChild(canvas);
        ctx = canvas.getContext("2d");
        mount(canvas);
    };

    return app;
}

const canvasApp = createCanvasApp(App)

canvasApp.mount("#app");
