import {
  drawRect,
  drawCircle,
  drawEllipse,
  drawLine,
  fillText,
} from "./canvasDraw";
import { ctx } from "../Canvas";

const draw = (el: any, clear = false) => {
  // 判断tag
  if (el.tag === "Circle") {
    const { r, x, y, fillStyle, oldXY } = el;
    if (clear) {
      ctx.clearRect(oldXY.x - r, oldXY.y - r, r * 2, r * 2);
    }
    drawCircle(x, y, r, fillStyle);
  }

  if (el.tag === "Rect") {
    const { x, y, w, h, fillStyle } = el;
    // if (clear) {
    //     ctx.clearRect(el.parent.oldXY.x + x, el.parent.oldXY.y + y, w, h);
    // }
    drawRect({ x, y, w, h, fillStyle });
  }

  if (el.tag === "Ellipse") {
    const { x, y, radiusX, radiusY } = el;
    drawEllipse({ x, y, radiusX, radiusY });
  }

  if (el.tag === "Line") {
    const { x1, y1, x2, y2 } = el;
    drawLine({ x1, y1, x2, y2 });
  }

  if (el.tag === "Text") {
    const { x, y, text, style = {} } = el;
    fillText({ x, y, text, style });
    console.log(el);
    // drawLine(ctx, x1, y1, x2, y2, 'blue')
  }

  // 递归绘制⼦节点
  // el.childs && el.childs.forEach((child) => draw(child, true));
};

export { draw };
