function drawRect(ctx, x, y, w, h, fillStyle) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, y, w, h);
    ctx.stroke();
    ctx.closePath();
}

function drawLine(ctx, x1, y1, x2, y2, fillStyle) {
    ctx.beginPath();
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function drawCircle(ctx, x, y, r, fillStyle) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    //不关闭路径路径会一直保留下去
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.closePath();
}

function drawEllipse(ctx, x, y, radiusX, radiusY, rotation = 0, startAngle = 0, endAngle = Math.PI * 2, anticlockwise) {
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
    ctx.fillStyle = "blue";
    ctx.fill();
}

function fillText(ctx, x, y, text, style = {}) {
    const { color, font, textBaseline, textAlign } = style
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = textBaseline;
    ctx.textAlign = textAlign;
    ctx.fillText(text, x, y);
    ctx.font = '20px "微软雅黑"';
}

export { drawCircle, drawRect, drawEllipse, drawLine, fillText };
