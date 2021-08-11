<template>
  <BarChart
    :x="0"
    :y="400"
    :w="600"
    :h="700"
    :data="chartData"
    @click="handleClick"
  >
  </BarChart>
  <Circle :x="x" :y="y" :r="r" fillStyle="rgba(0,255,0,0.25)">
    <Rect v-if="show" :x="150" :y="150" :w="100" :h="80" fillStyle="gray" />
  </Circle>
  <Ellipse :x="300" :y="300" :radiusX="200" :radiusY="50" />
  <Line :x1="10" :y1="10" :x2="100" :y2="100" />
  <Text
    text="哈哈哈"
    :x="200"
    :y="200"
    :style="{
      color: 'red',
      font: '40px Georgia',
      textBaseline: 'bottom',
      textAlign: 'left',
    }"
  ></Text>
</template>

<script setup>
import { reactive, ref } from "vue";
import { randomColor } from "./utils/color";

const chartData = reactive([
  { title: "黑铁", count: 260, color: "yellow" },
  { title: "⻘铜", count: 200, color: "brown" },
  { title: "钻石", count: 250, color: "pink" },
  { title: "星耀", count: 100, color: "purple" },
  { title: "王者", count: 50, color: "gold" },
]);

const x = ref(50);
const y = ref(50);
const r = ref(50);
const show = ref(true);

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
      y.value -= 20;
      break;
    case "ArrowDown":
      y.value += 20;
      break;
    case "ArrowLeft":
      x.value -= 20;
      break;
    case "ArrowRight":
      x.value += 20;
      break;
    case "Enter":
      show.value = !show.value;
      break;
    default:
      break;
  }
});
</script>

<style></style>
