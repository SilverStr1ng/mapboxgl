const addLayer = mapboxgl.Map.prototype.addLayer;
const removeLayer = mapboxgl.Map.prototype.removeLayer;

mapboxgl.Map.prototype.orderLayers = function (orderLayers = []) {
    // @ts-ignore
    const ly = this.style._layers;
    const layers = Object.keys(ly).map((key) => ly[key]);
    const ownLayers = [];
    const beforeLayers = [];
    orderLayers.forEach((id) => {
        if (id) {
            const l = layers.find((item) => item.id === id);
            if (l) {
                ownLayers.push(l);
            }
        }
    });
    layers.forEach((layer) => {
        const l = ownLayers.find((item) => item.id === layer.id);
        if (!l) {
            beforeLayers.push(layer);
        }
    });
    const allLayers = beforeLayers.concat(ownLayers);
    // @link github.com/mapbox/mapbox-gl-js/src/style/style.js
    this.style._checkLoaded();
    this.style._changed = true;
    this.style._order = allLayers.map((a) => a.id);
    this.style._layerOrderChanged = true;
    return allLayers;
}

mapboxgl.Map.prototype.addLayer = function (
    layerObject,
    before,
) {
    if (this._layers === undefined) {
        // eslint-disable-next-line no-underscore-dangle
        this._layers = [];
        this._sortLayers = [];
    }
    if (layerObject.id) {
        this._layers.push(layerObject);
    }
    if ('zIndex' in layerObject) {
        this._sortLayers.push(layerObject);
    }
    const args = addLayer.call(this, layerObject, before);
    const sortLayers = this._sortLayers.sort((a, b) => a.zIndex - b.zIndex);

    this.orderLayers(sortLayers.map((layer) => layer.id));
    return args;
}

mapboxgl.Map.prototype.removeLayer = function (id) {
    this._layers = this._layers.filter((layer) => layer.id !== id);
    this._sortLayers = this._sortLayers.filter((layer) => layer.id !== id);
    return removeLayer.call(this, id);
}
