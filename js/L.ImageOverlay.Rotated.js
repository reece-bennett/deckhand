// Inspired by https://github.com/IvanSanchez/Leaflet.ImageOverlay.Rotated

L.ImageOverlay.Rotated = L.ImageOverlay.extend({
  initialize: function (url, center, size, rotation, options) {
    const halfW = size[0] / 2
    const halfH = size[1] / 2
    const bounds = [
      [center.lat - halfH, center.lng - halfW],
      [center.lat + halfH, center.lng + halfW]
    ]
    L.ImageOverlay.prototype.initialize.call(this, url, bounds, options)
    this._rotation = rotation
  },

  _animateZoom: function (e) {
    L.ImageOverlay.prototype._animateZoom.call(this, e)
    this._image.style.transform += ` translate(50%, 50%) rotate(${this._rotation}deg) translate(-50%, -50%)`
  },

  _reset: function () {
    L.ImageOverlay.prototype._reset.call(this)
    this._image.style.transform += ` translate(50%, 50%) rotate(${this._rotation}deg) translate(-50%, -50%)`
  }
})

L.imageOverlay.rotated = function (url, center, size, rotation, options) {
  return new L.ImageOverlay.Rotated(url, center, size, rotation, options)
}
