/**
 *  File: L.SimpleGraticule.js
 *  Desc: A graticule for Leaflet maps in the L.CRS.Simple coordinate system.
 *  Auth: Andrew Blakey (ablakey@gmail.com)
 */

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

L.SimpleGraticule = L.LayerGroup.extend({
  options: {
    xInterval: 20,
    yInterval: 20,
    showOriginLabel: true,
    redraw: 'move',
    hidden: false,
    zoomIntervals: [],
    bounds: L.latLngBounds([0, 0], [26, 26])
  },

  lineStyle: {
    stroke: true,
    color: '#111',
    opacity: 0.6,
    weight: 1,
    interactive: false,
    clickable: false // legacy support
  },

  initialize: function (options) {
    L.LayerGroup.prototype.initialize.call(this)
    L.Util.setOptions(this, options)
  },

  onAdd: function (map) {
    this._map = map

    const graticule = this.redraw()
    this._map.on(
      'viewreset ' + this.options.redraw,
      graticule.redraw,
      graticule
    )

    this.eachLayer(map.addLayer, map)
  },

  onRemove: function (map) {
    // map.off('viewreset ' + this.options.redraw, this.map)
    this.eachLayer(this.removeLayer, this)
  },

  hide: function () {
    this.options.hidden = true
    this.redraw()
  },

  show: function () {
    this.options.hidden = false
    this.redraw()
  },

  redraw: function () {
    // Pad the bounds to draw lines a little longer
    this._bounds = this._map.getBounds().pad(0.5)

    this.clearLayers()

    const currentZoom = this._map.getZoom()

    for (let i = 0; i < this.options.zoomIntervals.length; i++) {
      if (
        currentZoom >= this.options.zoomIntervals[i].start &&
        currentZoom <= this.options.zoomIntervals[i].end
      ) {
        this.options.interval = this.options.zoomIntervals[i].interval
        break
      }
    }

    this.constructLines(this.getMins(), this.getLineCounts())

    if (this.options.showOriginLabel) {
      this.addLayer(this.addOriginLabel())
    }

    return this
  },

  getLineCounts: function () {
    return {
      x: Math.ceil(
        (
          Math.min(this._bounds.getEast(), this.options.bounds.getEast()) -
          Math.max(this._bounds.getWest(), this.options.bounds.getWest())
        ) / this.options.xInterval
      ),
      y: Math.ceil(
        (
          Math.min(this._bounds.getNorth(), this.options.bounds.getNorth()) -
          Math.max(this._bounds.getSouth(), this.options.bounds.getSouth())
        ) / this.options.yInterval
      )
    }
  },

  getMins: function () {
    // Round down to nearest interval
    return {
      x: Math.floor(Math.max(this._bounds.getWest(), this.options.bounds.getWest()) / this.options.xInterval) * this.options.xInterval,
      y: Math.floor(Math.max(this._bounds.getSouth(), this.options.bounds.getSouth()) / this.options.yInterval) * this.options.yInterval
    }
  },

  constructLines: function (mins, counts) {
    const lines = new Array(counts.x + counts.y)
    const labels = new Array(counts.x + counts.y)

    // for horizontal lines
    for (let i = 0; i <= counts.x; i++) {
      const x = mins.x + i * this.options.xInterval
      lines[i] = this.buildXLine(x)
      if (i > 0) {
        labels[i] = this.buildLabel('gridlabel-horiz', ALPHABET[i + mins.x - 1], mins.x + (i - 1) * this.options.xInterval)
      }
    }

    // for vertical lines
    for (let j = 0; j <= counts.y; j++) {
      const y = mins.y + j * this.options.yInterval
      lines[j + counts.x + 1] = this.buildYLine(y)
      if (j > 0) {
        labels[j + counts.x + 1] = this.buildLabel('gridlabel-vert', 27 - mins.y - j, y)
      }
    }

    lines.forEach(this.addLayer, this)
    labels.forEach(this.addLayer, this)
  },

  buildXLine: function (x) {
    const bottomLL = new L.LatLng(Math.max(this._bounds.getSouth(), this.options.bounds.getSouth()), x)
    const topLL = new L.LatLng(Math.min(this._bounds.getNorth(), this.options.bounds.getNorth()), x)

    return new L.Polyline([bottomLL, topLL], this.lineStyle)
  },

  buildYLine: function (y) {
    const leftLL = new L.LatLng(y, Math.max(this._bounds.getWest(), this.options.bounds.getWest()))
    const rightLL = new L.LatLng(y, Math.min(this._bounds.getEast(), this.options.bounds.getEast()))

    return new L.Polyline([leftLL, rightLL], this.lineStyle)
  },

  buildLabel: function (axis, text, pos) {
    const bounds = this._map.getBounds().pad(-0.003)
    let latLng
    if (axis === 'gridlabel-horiz') {
      latLng = new L.LatLng(bounds.getNorth(), pos)
    } else {
      latLng = new L.LatLng(pos, bounds.getWest())
    }

    return L.marker(latLng, {
      interactive: false,
      clickable: false, // legacy support
      icon: L.divIcon({
        iconSize: [0, 0],
        className: 'leaflet-grid-label',
        html: '<div class="' + axis + '">' + text + '</div>'
      })
    })
  },

  addOriginLabel: function () {
    return L.marker([0, 0], {
      interactive: false,
      clickable: false, // legacy support
      icon: L.divIcon({
        iconSize: [0, 0],
        className: 'leaflet-grid-label',
        html: '<div class="gridlabel-horiz">(0,0)</div>'
      })
    })
  }
})

L.simpleGraticule = function (options) {
  return new L.SimpleGraticule(options)
}
