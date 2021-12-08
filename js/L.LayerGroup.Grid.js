L.LayerGroup.Grid = L.LayerGroup.extend({
  _ALPHABET: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',

  _lineStyle: {
    color: '#111',
    opacity: 0.2,
    weight: 1,
    interactive: false
  },

  options: {
    interval: { x: 1.5, y: 1 },
    size: { x: 26, y: 26 }
  },

  initialize: function (options) {
    L.LayerGroup.prototype.initialize.call(this)
    L.Util.setOptions(this, options)
  },

  onAdd: function (map) {
    L.LayerGroup.prototype.onAdd.call(this, map)
    this._draw()
    map.on('viewreset move', this._draw, this)
  },

  onRemove: function (map) {
    L.LayerGroup.prototype.onRemove.call(this, map)
    map.off('viewreset move', this._draw, this)
  },

  _calculateBounds: function () {
    return L.latLngBounds([
      [0, 0],
      [
        this.options.size.y * this.options.interval.y,
        this.options.size.x * this.options.interval.x
      ]
    ])
  },

  _draw: function () {
    this.clearLayers()

    const bounds = this._calculateBounds()

    for (let i = 0; i <= this.options.size.x; i++) {
      const x = i * this.options.interval.x

      this.addLayer(L.polyline([
        [bounds.getSouth(), x],
        [bounds.getNorth(), x]
      ], this._lineStyle))

      if (i < this.options.size.x) {
        this.addLayer(L.marker([
          Math.min(bounds.getNorth(), this._map.getBounds().getNorth() - 0.2),
          x + (this.options.interval.x / 2)
        ], {
          interactive: false,
          keyboard: false,
          icon: L.divIcon({
            html: this._ALPHABET[i]
          })
        }))
      }
    }

    for (let i = 0; i <= this.options.size.y; i++) {
      const y = i * this.options.interval.y

      this.addLayer(L.polyline([
        [y, bounds.getWest()],
        [y, bounds.getEast()]
      ], this._lineStyle))

      if (i > 0) {
        this.addLayer(L.marker([
          y - (this.options.interval.y / 2),
          Math.max(bounds.getWest(), this._map.getBounds().getWest() + 0.2)
        ], {
          interactive: false,
          keyboard: false,
          icon: L.divIcon({
            html: 27 - i
          })
        }))
      }
    }
  }
})

L.layerGroup.grid = function (options) {
  return new L.LayerGroup.Grid(options)
}
