import { createRenderer } from "vue";
import App from "./App.vue";

const renderer = createRenderer({
    // 元素插入到页面中会调用此方法
    insert: (child, parent = {}, anchor) => {
        if (!child) return
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
        console.log('createElement', tag);
        return { tag };
    },
    createText: (text) => {
        console.log('createText', text)
    },
    createComment: (text) => { },
    setText: (node, text) => { },
    setElementText: (el, text) => { },
    parentNode: (node) => {
        console.log('parentNode', node)
    },
    nextSibling: (node) => {
        console.log('nextSibling', node)
    },
    querySelector: (selector) => {
        console.log('querySelector', selector)
    },
    setScopeId(el, id) { },
    cloneNode(el) {
        console.log('cloneNode', el)
    },
    insertStaticContent(content, parent, anchor, isSVG) { },
    // 每次更新属性会调用此方法
    patchProp(el, key, prevValue, nextValue) {
        console.log("patchProp", key, prevValue, nextValue);
        if (prevValue) {
            draw(el)
        }
        el[key] = nextValue;
    },
});

// 画画的逻辑
let canvas, ctx;
const gap = 20;
const draw = (el, noClear = false) => {
    console.log(el)
    // 清空画布
    // if (!noClear) {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    // }
    // 判断tag
    if (el.tag === "BarChart") {
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
    if (el.tag === 'Circle') {
        console.log(el);
        const { r, x, y, fillStyle } = el
        if (!noClear) {
            ctx.clearRect(x - r, y - r, r * 2, r * 2);
        }

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        //不关闭路径路径会一直保留下去
        ctx.closePath();
        ctx.fillStyle = fillStyle;
        ctx.fill();
    }
    if (el.tag === 'Rect') {
        myRect(ctx, 50, 50, 200, 200);
    }

    // 递归绘制⼦节点
    el.childs && el.childs.forEach((child) => draw(child, true));
};

function myRect(ctxTmp, x, y, w, h) {
    ctxTmp.moveTo(x, y)
    ctxTmp.lineTo(x + w, y)
    ctxTmp.lineTo(x + w, y + h)
    ctxTmp.lineTo(x, y + h)
    ctxTmp.lineTo(x, y)
    ctxTmp.stroke()
}

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
