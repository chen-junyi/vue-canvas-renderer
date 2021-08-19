import {
  drawRect,
  drawCircle,
  drawEllipse,
  drawLine,
  fillText,
} from "./canvasDraw";
import { ctx } from "../Canvas";

const draw = (el: any, clear = false) => {
  // console.log(el)
  // 清空画布
  // 判断tag
  if (el.tag === "Circle") {
    const { r, x, y, fillStyle, oldXY } = el;
    if (clear) {
      ctx.clearRect(oldXY.x - r, oldXY.y - r, r * 2, r * 2);
    }
    drawCircle(ctx, x, y, r, fillStyle);
  }

  if (el.tag === "Rect") {
    const { x, y, w, h, fillStyle } = el;
    // if (clear) {
    //     ctx.clearRect(el.parent.oldXY.x + x, el.parent.oldXY.y + y, w, h);
    // }
    drawRect(ctx, { x, y, w, h, fillStyle });
  }

  if (el.tag === "Ellipse") {
    const { x, y, radiusX, radiusY } = el;
    drawEllipse(ctx, { x, y, radiusX, radiusY });
  }

  if (el.tag === "Line") {
    const { x1, y1, x2, y2 } = el;
    drawLine(ctx, { x1, y1, x2, y2 });
  }

  if (el.tag === "Text") {
    const { x, y, text, style = {} } = el;
    fillText(ctx, { x, y, text, style });
    console.log(el);
    // drawLine(ctx, x1, y1, x2, y2, 'blue')
  }

  // 递归绘制⼦节点
  // el.childs && el.childs.forEach((child) => draw(child, true));
};

export { draw };
