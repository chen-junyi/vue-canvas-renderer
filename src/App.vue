<template>
  <bar-chart :data="chartData"></bar-chart>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const chartData = reactive([
      { title: "黑铁", count: 260, color: "yellow" },
      { title: "⻘铜", count: 200, color: "brown" },
      { title: "钻石", count: 300, color: "pink" },
      { title: "星耀", count: 100, color: "purple" },
      { title: "王者", count: 50, color: "gold" },
    ]);
    function handleClick() {
      // state.data.push({ name: "其他", count: 30, color: "orange" });
    }
    return {
      chartData,
      handleClick,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
