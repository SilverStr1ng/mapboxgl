import { onMounted, inject, ref } from 'vue';

export default function loadGeoJSON() {

    let timer = null;
    const heightIncrease = ref(null);
    const stopIncrease = ref(null);

    heightIncrease.value = () => {
        let height = $map.getPaintProperty("points", "fill-extrusion-height");
        timer = setInterval(() => {
            height += 10;
            $map.setPaintProperty("points", "fill-extrusion-height", height);
        }, 50);
    };

    stopIncrease.value = () => {
        if (timer)
            clearInterval(timer);
    };

    onMounted(() => {
        const $map = inject('map')
        $map.on("load", () => {
            $map.addLayer({
                id: "points",
                type: "fill-extrusion",
                source: {
                    type: "geojson",
                    data: 'http://39.103.151.139:8000/gis/zhongdi'
                },
                paint: {
                    "fill-extrusion-color": "#652e80",
                    //可以获取properties属性中的参数 ['get','people']
                    "fill-extrusion-height": 200,
                    "fill-extrusion-opacity": 0.6,
                }
            });
        })
        let timer = null;
        $map.on("mousedown", () => {
            let height = $map.getPaintProperty("points", "fill-extrusion-height");
            timer = setInterval(() => {
                height += 10;
                $map.setPaintProperty("points", "fill-extrusion-height", height);
            }
                , 50);
        })
        $map.on("mouseup", () => {
            if (timer)
                clearInterval(timer);
        })
    })
    return {
        heightIncrease,
        stopIncrease
    }
}