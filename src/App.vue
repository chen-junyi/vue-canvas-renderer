<template>
  <BarChart @click="handleClick" :data="chartData" />
</template>

<script setup>
import { reactive } from "vue";
import { randomColor } from "./utils/color";

const chartData = reactive([
  { title: "黑铁", count: 260, color: "yellow" },
  { title: "⻘铜", count: 200, color: "brown" },
  { title: "钻石", count: 300, color: "pink" },
  { title: "星耀", count: 100, color: "purple" },
  { title: "王者", count: 50, color: "gold" },
]);

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
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
