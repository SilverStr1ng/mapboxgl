<template>
    <div class="control-view">

    </div>
</template>

<script setup>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
onMounted(() => {
    const $map = inject("$map")
    // 添加导航控件
    const nav = new mapboxgl.NavigationControl()
    $map.addControl(nav, 'top-left')
    // 添加比例尺控件
    const scale = new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: 'metric'
    })
    $map.addControl(scale, 'bottom-right')
    // 添加全屏控件
    const fullscreen = new mapboxgl.FullscreenControl()
    $map.addControl(fullscreen, 'top-right')

});
</script>

<style lang="scss" scoped></style>