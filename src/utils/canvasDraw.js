function drawRect(ctx, x, y, w, h, fillStyle) {
    ctx.beginPath();
    ctx.lineWidth = 5
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, y, w, h)
    ctx.stroke();
    ctx.closePath();
}

function drawCircle(ctx, x, y, r, fillStyle) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    //不关闭路径路径会一直保留下去
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
}

export { drawCircle, drawRect };
