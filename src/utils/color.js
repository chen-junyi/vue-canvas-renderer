function randomColor() {
   var col = "#";
   for (var i = 0; i < 6; i++) col += parseInt(Math.random() * 16).toString(16);
   return col;
}

export { randomColor };
