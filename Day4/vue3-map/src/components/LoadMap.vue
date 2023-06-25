<template>
    <div id="map"></div>
</template>

<script setup>
// 实例化mapboxgl
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as L7 from '@antv/l7';
import { onMounted } from 'vue';
import axios from 'axios';

onMounted(async () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbmdiZW5jaGFvIiwiYSI6ImNsODU3aGRiODA0Y2UzcHBzZmFlcmdqZ2sifQ.8k59W_pB_Riwe6o-MneRlA'
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        /* style-layer */
        style: 'mapbox://styles/mapbox/satellite-v9', // style URL
        center: [114.30, 30.50], // starting position [lng, lat]
        zoom: 14, // starting zoom
        projection: "globe"
    });
    const { Scene, Mapbox, LineLayer } = L7;
    const importRiverData = import.meta.glob('../assets/data/river-other.json');
    const riverDataModule = await importRiverData['../assets/data/river-other.json']();
    const riverData = riverDataModule.default;
    const scene = new Scene({
        id: 'map',
        map: new Mapbox({
            mapInstance: map,
        }),
    });
    scene.on('loaded', () => {
        const lineLayer = new LineLayer({
            zIndex: 2
        })
            .source(riverData)
            .size(1)
            .shape('line')
            .color('name', n => {
                //  以溪结尾的河流, 绿色, 以河结尾的河流, 蓝色
                if (n.endsWith('溪')) {
                    return '#00FF00';
                }
                else if (n.endsWith('河')) {
                    return '#0000FF';
                }
                else {
                    return '#FF0000';
                }
            })
            .style({
                opacity: 1.0
            });
        scene.addLayer(lineLayer);
    });
})
</script>

<style lang="scss" scoped>
#map {
    width: 100vw;
    height: 100vh;
}
</style>