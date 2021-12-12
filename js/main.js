import islands from '../data/islands.js'

const positionText = document.querySelector('#position-text')

function updatePositionText () {
  const { lng: x, lat: y } = map.getCenter()
  const zoom = map.getZoom()
  positionText.innerText = `x: ${x.toFixed()} y: ${y.toFixed()} zoom: ${zoom}`
}

const xy = function (x, y) {
  if (L.Util.isArray(x)) {
    // When doing xy([x, y])
    return L.latLng(26 - x[1], x[0])
  }
  // When doing xy(x, y)
  return L.latLng(26 - y, x)
}

const map = L.map('map', {
  crs: L.CRS.Simple,
  center: [13, 13],
  zoomSnap: 0.25, // 1
  zoomDelta: 1, // 1
  wheelDebounceTime: 40, // 40
  wheelPxPerZoomLevel: 60, // 60
  renderer: L.svg({
    padding: 1 // Stops grid disappearing when panning
  })
})
map.setView([15, 15], 4)
// map.fitBounds([xy(0, 0), xy(26, 26)])

islands.forEach(island => {
  const image = L.imageOverlay.rotated(
    island.image,
    xy(island.x, island.y),
    [island.width, island.height],
    island.rotation
  ).addTo(map)
  image._image.style.imageRendering = 'pixelated' // Not sure I like this, bit blurry is nice when you are far out, maybe only add at high zoom levels?

  const W_2 = island.width * 0.5
  const offset = W_2 + W_2 * (Math.SQRT2 - 1) * Math.abs(Math.sin(island.rotation * (Math.PI / 90)))
  L.marker(xy(island.x, island.y - Math.abs(offset)), {
    interactive: false,
    keyboard: false,
    icon: L.divIcon({
      className: 'island-label',
      iconSize: null, // Setting to null unsets width and height styles
      html: `<div class="island-label__text">${island.name}</div>`
    })
  }).addTo(map)
})

L.layerGroup.grid({

}).addTo(map)

map.on('zoom move', updatePositionText)

updatePositionText()
