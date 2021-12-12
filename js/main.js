import islands from '../data/islands.js'

const positionText = document.querySelector('#position-text')

function updatePositionText () {
  const { lng: x, lat: y } = map.getCenter()
  const zoom = map.getZoom()
  positionText.innerText = `x: ${x.toFixed()} y: ${y.toFixed()} zoom: ${zoom}`
}

const xy = function (x, y) {
  if (L.Util.isArray(x)) {
    // When doing xy([x, y]);
    return L.latLng(26 - x[1], x[0])
  }
  return L.latLng(26 - y, x) // When doing xy(x, y);
}

// const bounds = [[0, 0], [26, 26]]
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
// map.setView([14, 18], 3)
map.setView([15, 15], 4)
// map.fitBounds([xy(0, 0), xy(26, 26)])

// L.tileLayer(
//   "https://www.seaofthievesmap.info/tiles-forsaken2/{z}/{x}/{y}.png",
//   {
//     attribution:
//       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }
// ).addTo(map);

// const imageUrl =
//   "https://cdn.glitch.me/77a1fe70-8bf7-41d2-b7cc-a9e112011122%2Fmap.svg?v=1638478364898";
// L.imageOverlay(imageUrl, bounds).addTo(map)

islands.forEach(island => {
  const image = L.imageOverlay.rotated(
    island.image,
    xy(island.x, island.y),
    [island.width, island.height],
    island.rotation
  ).addTo(map)
  image._image.style.imageRendering = 'pixelated' // Not sure I like this, bit blurry is nice when you are far out, maybe only add at high zoom levels?
  // image._image.style.background = 'red'
})

// L.simpleGraticule({
//   xInterval: 1.5,
//   yInterval: 1,
//   bounds: L.latLngBounds([0, 0], [26, 39]),
//   showOriginLabel: false,
//   redraw: 'move'
// }).addTo(map)

L.layerGroup.grid({

}).addTo(map)

// const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
// svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
// svgElement.setAttribute('viewBox', '0 0 26 26')
// svgElement.innerHTML = '<rect width="100%" height="100%" stroke-width=".01" stroke="red" fill="rgba(0, 0, 0, 0)"/><line y1="1" x2="100%" y2="1" stroke-width=".01" stroke="green"/><line y1="2" x2="100%" y2="2" stroke-width=".01" stroke="green"/><line y1="3" x2="100%" y2="3" stroke-width=".01" stroke="green"/><line y1="4" x2="100%" y2="4" stroke-width=".01" stroke="green"/><line y1="5" x2="100%" y2="5" stroke-width=".01" stroke="green"/><line y1="6" x2="100%" y2="6" stroke-width=".01" stroke="green"/><line y1="7" x2="100%" y2="7" stroke-width=".01" stroke="green"/><line y1="8" x2="100%" y2="8" stroke-width=".01" stroke="green"/><line y1="9" x2="100%" y2="9" stroke-width=".01" stroke="green"/><line y1="10" x2="100%" y2="10" stroke-width=".01" stroke="green"/><line y1="11" x2="100%" y2="11" stroke-width=".01" stroke="green"/><line y1="12" x2="100%" y2="12" stroke-width=".01" stroke="green"/><line y1="13" x2="100%" y2="13" stroke-width=".01" stroke="green"/><line y1="14" x2="100%" y2="14" stroke-width=".01" stroke="green"/><line y1="15" x2="100%" y2="15" stroke-width=".01" stroke="green"/><line y1="16" x2="100%" y2="16" stroke-width=".01" stroke="green"/><line y1="17" x2="100%" y2="17" stroke-width=".01" stroke="green"/><line y1="18" x2="100%" y2="18" stroke-width=".01" stroke="green"/><line y1="19" x2="100%" y2="19" stroke-width=".01" stroke="green"/><line y1="20" x2="100%" y2="20" stroke-width=".01" stroke="green"/><line y1="21" x2="100%" y2="21" stroke-width=".01" stroke="green"/><line y1="22" x2="100%" y2="22" stroke-width=".01" stroke="green"/><line y1="23" x2="100%" y2="23" stroke-width=".01" stroke="green"/><line y1="24" x2="100%" y2="24" stroke-width=".01" stroke="green"/><line y1="25" x2="100%" y2="25" stroke-width=".01" stroke="green"/><line x1="1" x2="1" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="2" x2="2" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="3" x2="3" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="4" x2="4" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="5" x2="5" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="6" x2="6" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="7" x2="7" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="8" x2="8" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="9" x2="9" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="10" x2="10" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="11" x2="11" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="12" x2="12" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="13" x2="13" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="14" x2="14" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="15" x2="15" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="16" x2="16" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="17" x2="17" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="18" x2="18" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="19" x2="19" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="20" x2="20" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="21" x2="21" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="22" x2="22" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="23" x2="23" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="24" x2="24" y2="100%" stroke-width=".01" stroke="#00f"/><line x1="25" x2="25" y2="100%" stroke-width=".01" stroke="#00f"/>'
// L.svgOverlay(svgElement, [[0, 0], [26, 26]]).addTo(map)

map.on('zoom', updatePositionText)
map.on('move', updatePositionText)

updatePositionText()
