import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { onMounted} from 'vue';
import { app } from '@/main.js'

export default function initMap() {
    onMounted(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbmdiZW5jaGFvIiwiYSI6ImNsODU3aGRiODA0Y2UzcHBzZmFlcmdqZ2sifQ.8k59W_pB_Riwe6o-MneRlA';
        const $map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [114.40, 30.465],
            pitch: 60,
            zoom: 16,
            projection: "globe"
        });

        $map.on('load', () => {
            $map.setFog({})
        })

        app.provide('map', $map)
        return $map;
    })
}