<template>
  <BarChart :data="chartData"> </BarChart>
  <Circle @click="() => {}" :x="x" :y="y" :r="r" fillStyle="rgba(0,255,0,0.25)">
    <Rect />
  </Circle>
</template>

<script setup>
import { reactive, ref } from "vue";
import { randomColor } from "./utils/color";

const chartData = reactive([
  { title: "黑铁", count: 260, color: "yellow" },
  { title: "⻘铜", count: 200, color: "brown" },
  { title: "钻石", count: 300, color: "pink" },
  { title: "星耀", count: 100, color: "purple" },
  { title: "王者", count: 50, color: "gold" },
]);

const x = ref(50);
const y = ref(50);
const r = ref(50);

function randomData() {
  return {
    title: "超凡",
    count: Math.floor(Math.random() * 200),
    color: randomColor(),
  };
}

function handleClick() {
  chartData.push(randomData());
}

document.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "ArrowUp":
      y.value--;
      break;
    case "ArrowDown":
      y.value++;
      break;
    case "ArrowLeft":
      x.value--;
      break;
    case "ArrowRight":
      x.value++;
      break;
    default:
      break;
  }

  console.log(y);
});
</script>

<style></style>
