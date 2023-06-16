<template>
    <div id="map">

    </div>
</template>

<script setup>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { app } from '../main.js'
const token = import.meta.env.VITE_MAPBOX_TOKEN
mapboxgl.accessToken = token
onMounted(() => {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [114.30, 30.50],
        zoom: 6,
        projection: 'globe'
    });
    map.on("style.load", () => {
        map.setFog({})
    })
    app.provide('$map', map)
});
</script>

<style lang="scss" scoped>
#map {
    width: 100vw;
    ;
    height: 100vh;
    ;
}
</style>