<template>
    <div id="map">

    </div>
</template>

<script setup>
import initMap from './Hooks/useInitMap.js'
// 初始化地图
initMap();
</script>

<style lang="scss" scoped>
#map {
    width: 100vw;
    height: 100vh;
}
</style>