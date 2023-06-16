<template>
    <div>

    </div>
</template>

<script setup>
onMounted(() => {
    const $map = inject("$map")
    
    $map.on('style.load', () => {
        // addSource  addLayer
        $map.addSource('wuhan-source', {
            type: 'geojson',
            data: 'https://geo.datav.aliyun.com/areas_v3/bound/420100_full.json'
        });

        $map.addLayer({
            id: 'wuhan-layer',
            type: 'fill',
            source: 'wuhan-source',
            paint: {
                'fill-color': 'red',
                'fill-opacity': 0.5
            }
        });
    });
});
</script>

<style lang="scss" scoped></style>