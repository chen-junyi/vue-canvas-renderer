import { createRenderer } from 'vue';
// import { createRenderer } from '@vue/runtime-dom';
import App from './App.vue'

const renderer = createRenderer(
    // 创建element
    {
      createElement(tag) {
        return { tag };
      },
      // 更新属性
      patchProp(el, key, prevValue, nextValue) {
        // el就是上面对象，key是data，nextValue就是数据数组
        el[key] = nextValue;
      },
      // 插入操作
      insert(child, parent) {
        // 判断为元素就执行画画操作
        if (parent.nodeType === 1) {
          // parent是canvas
          draw(child);
        }
      },
      // createComment() {}
    }
  );

  // 画画的逻辑
  let canvas, ctx;
  const draw = (el, noClear) => {
    // 清空画布
    if (!noClear) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    // 判断tag
    if (el.tag == "bar-chart") {
      const { data } = el;
      const barWidth = canvas.width / 10,
        gap = 20,
        paddingLeft =
          (data.length * barWidth + (data.length - 1) * gap) / 2,
        paddingBottom = 10;
      // x轴
      // 柱状图
      data.forEach(({ title, count, color }, index) => {
        const x = paddingLeft + index * (barWidth + gap);
        const y = canvas.height - paddingBottom - count;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, barWidth, count);
        // ctx.fillRect(barWidth, count*2, x, y)
        // text
      });
    }
    // 递归绘制⼦节点
    el.childs && el.childs.forEach((child) => draw(child, true));
  };

  // 声明高阶函数
  function createCanvasApp(App) {
    const app = renderer.createApp(App);
    const mount = app.mount;

    app.mount = function (sel) {
      canvas = document.createElement("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.querySelector(sel).appendChild(canvas);
      ctx = canvas.getContext("2d");
      mount(canvas);
    };

    return app;
  }

  createCanvasApp(App).mount("#app");