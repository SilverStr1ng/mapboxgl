<template>
  <div id="map">

  </div>
</template>

<script setup>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { onMounted } from 'vue';
const token = import.meta.env.VITE_MAPBOX_TOKEN;
mapboxgl.accessToken = token;
onMounted(() => {
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
})
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100vh;
}
</style>