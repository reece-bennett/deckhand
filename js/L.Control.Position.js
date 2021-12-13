L.Control.Position = L.Control.extend({
  onAdd: function (map) {
    const container = L.DomUtil.create('div', 'control-position')
    this._positionText = L.DomUtil.create('span', 'control-position__text', container)

    map.on('zoom move', this._update, this)
    this._update()

    return container
  },

  onRemove: function (map) {

  },

  _update: function () {
    const { lng: x, lat: y } = this._map.getCenter()
    const zoom = this._map.getZoom()
    this._positionText.innerText = `x:${x.toFixed(1)} y:${y.toFixed(1)} z:${zoom.toFixed(2)}`
  }
})

L.control.position = function (options) {
  return new L.Control.Position(options)
}
