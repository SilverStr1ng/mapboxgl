<template>
  <div>
    <LoadMapBox />
    <MapBoxControl />
    <MapBoxGeoJSON />
  </div>
</template>

<script setup>
import LoadMapBox from './components/LoadMapBox.vue';
import MapBoxControl from './components/MapBoxControl/MapBoxControl.vue'
import MapBoxGeoJSON from './components/MapBoxGeoJSON/MapBoxGeoJSON.vue'
</script>

<style lang="scss" scoped></style>