import { createRenderer } from "vue";
import App from "./App.vue";

const renderer = createRenderer({
    // 元素插入到页面中会调用此方法
    insert: (child, parent, anchor) => {
        child.parent = parent;
        if (!parent.childs) {
            // 格式化父子关系
            parent.childs = [child];
        } else {
            parent.childs.push(child);
        }
        if (parent.nodeType == 1) {
            draw(child); // 开始绘图
            if (child.onClick) {
                ctx.canvas.addEventListener(
                    "click",
                    () => {
                        child.onClick();
                        draw(child);
                    },
                    false
                );
            }
        }
    },
    remove: (child) => { },
    // 创建元素会调用此方法
    createElement: (tag, isSVG, is) => {
        return { tag };
    },
    createText: (text) => { },
    createComment: (text) => { },
    setText: (node, text) => { },
    setElementText: (el, text) => { },
    parentNode: (node) => { },
    nextSibling: (node) => { },
    querySelector: (selector) => { },
    setScopeId(el, id) { },
    cloneNode(el) { },
    insertStaticContent(content, parent, anchor, isSVG) { },
    // 每次更新属性会调用此方法
    patchProp(el, key, prevValue, nextValue) {
        console.log("patchProp", key);
        el[key] = nextValue;
    },
});

// 画画的逻辑
let canvas, ctx;
const gap = 20;
const draw = (el, noClear = false) => {
    // 清空画布
    if (!noClear) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    // 判断tag
    if (el.tag == "BarChart") {
        const { data } = el;
        const barWidth = (canvas.width - gap * data.length) / data.length,
            paddingBottom = 20;
        // x轴
        // 柱状图
        data.forEach(({ title, count, color }, index) => {
            const x = index * (barWidth + gap);
            const y = canvas.height - paddingBottom - count;
            ctx.fillStyle = color;
            ctx.fillRect(x, y, barWidth, count);
            ctx.fillStyle = "black";
            ctx.fillText(title, x + barWidth / 2 - 12, canvas.height);
        });
    }
    // 递归绘制⼦节点
    el.childs && el.childs.forEach((child) => draw(child, true));
};

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

createCanvasApp(App).mount("#app");
