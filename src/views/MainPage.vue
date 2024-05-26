<template>
  <div class="about flex" style="position:relative;">
      <Map/>

<!--    <PeiChart/>-->
  </div>
</template>
<script>
import Map from "@/components/svgComponents/map"
import PeiChart from "@/components/UIElements/PeiChart";

export default {
  components: {
    Map,
    PeiChart
  },
  mounted() {
  }
}
</script>
<style>
.container {
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  overflow: auto;
  transition: all 0.3s ease;
}
</style>