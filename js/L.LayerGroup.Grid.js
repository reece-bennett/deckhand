L.LayerGroup.Grid = L.LayerGroup.extend({
  _ALPHABET: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',

  _lineStyle: {
    color: '#111',
    opacity: 0.2,
    weight: 1,
    interactive: false
  },

  options: {
    interval: { x: 1.07, y: 1 },
    size: { x: 26, y: 26 }
  },

  initialize: function (options) {
    L.LayerGroup.prototype.initialize.call(this)
    L.Util.setOptions(this, options)

    this._xMarkers = []
    this._yMarkers = []
  },

  onAdd: function (map) {
    L.LayerGroup.prototype.onAdd.call(this, map)
    this._draw()
    map.on('viewreset move', this._updateMarkers, this)
  },

  onRemove: function (map) {
    L.LayerGroup.prototype.onRemove.call(this, map)
    map.off('viewreset move', this._updateMarkers, this)
  },

  _calculateBounds: function () {
    this._bounds = L.latLngBounds([
      [0, 0],
      [
        this.options.size.y * this.options.interval.y,
        this.options.size.x * this.options.interval.x
      ]
    ])
  },

  _calculateXMarkerLatLng: function (i) {
    return [
      Math.min(this._bounds.pad(0.02).getNorth(), this._map.getBounds().pad(-0.02).getNorth()),
      i * this.options.interval.x + (this.options.interval.x / 2)
    ]
  },

  _calculateYMarkerLatLng: function (i) {
    return [
      i * this.options.interval.y - (this.options.interval.y / 2),
      Math.max(this._bounds.pad(0.02).getWest(), this._map.getBounds().pad(-0.02).getWest())
    ]
  },

  _updateMarkers: function () {
    this._calculateBounds()

    for (let i = 0; i < this._xMarkers.length; i++) {
      this._xMarkers[i].setLatLng(this._calculateXMarkerLatLng(i))
    }

    for (let i = 1; i < this._yMarkers.length; i++) {
      this._yMarkers[i].setLatLng(this._calculateYMarkerLatLng(i))
    }
  },

  _draw: function () {
    this.clearLayers()

    this._calculateBounds()

    for (let i = 0; i <= this.options.size.x; i++) {
      const x = i * this.options.interval.x

      this.addLayer(L.polyline([
        [this._bounds.getSouth(), x],
        [this._bounds.getNorth(), x]
      ], this._lineStyle))

      if (i < this.options.size.x) {
        const marker = L.marker(this._calculateXMarkerLatLng(i), {
          interactive: false,
          keyboard: false,
          icon: L.divIcon({
            html: this._ALPHABET[i]
          })
        })
        this._xMarkers[i] = marker
        this.addLayer(marker)
      }
    }

    for (let i = 0; i <= this.options.size.y; i++) {
      const y = i * this.options.interval.y

      this.addLayer(L.polyline([
        [y, this._bounds.getWest()],
        [y, this._bounds.getEast()]
      ], this._lineStyle))

      if (i > 0) {
        const marker = L.marker(this._calculateYMarkerLatLng(i), {
          interactive: false,
          keyboard: false,
          icon: L.divIcon({
            html: 27 - i
          })
        })
        this._yMarkers[i] = marker
        this.addLayer(marker)
      }
    }
  }
})

L.layerGroup.grid = function (options) {
  return new L.LayerGroup.Grid(options)
}
