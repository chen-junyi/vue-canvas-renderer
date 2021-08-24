import { ctx } from "../Canvas";

interface BaseArg {
  x: number;
  y: number;
}

interface RectArg extends BaseArg {
  w: number;
  h: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

function drawRect(options: RectArg) {
  const { x, y, w, h, fill, stroke, strokeWidth } = options;
  ctx.beginPath();
  ctx.fillStyle = fill || "transparent";
  ctx.fillRect(x, y, w, h);
  ctx.rect(x, y, w, h);
  ctx.strokeStyle = stroke || "transparent";
  ctx.lineWidth = strokeWidth || 0;
  ctx.stroke();
  ctx.closePath();
}

function drawLine({ x1, y1, x2, y2, fillStyle }) {
  ctx.beginPath();
  ctx.strokeStyle = "gray";
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function drawCircle(x, y, r, fillStyle) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  //不关闭路径路径会一直保留下去
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.closePath();
}

function drawEllipse({
  x,
  y,
  radiusX,
  radiusY,
  rotation = 0,
  startAngle = 0,
  endAngle = Math.PI * 2,
  anticlockwise,
}) {
  ctx.beginPath();
  ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
  ctx.fillStyle = "blue";
  ctx.fill();
}

function fillText({ x, y, text, style = {} }) {
  const { color, font, textBaseline, textAlign } = style;
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = textBaseline;
  ctx.textAlign = textAlign;
  ctx.fillText(text, x, y);
  ctx.font = '20px "微软雅黑"';
}

export { drawCircle, drawRect, drawEllipse, drawLine, fillText };
