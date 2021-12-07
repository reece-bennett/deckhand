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
  center: [13, 13]
})
map.fitBounds([xy(0, 0), xy(26, 26)])

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

const image = L.imageOverlay.rotated(
  'https://cdn.glitch.me/77a1fe70-8bf7-41d2-b7cc-a9e112011122%2FsmugglersBay.png?v=1638482263399',
  xy(5, 3),
  [1, 1],
  70
).addTo(map)
image._image.style.imageRendering = 'pixelated' // Not sure I like this, bit blurry is nice when you are far out, maybe only add at high zoom levels?
// image._image.style.background = 'red'

L.simpleGraticule({
  interval: 1,
  showOriginLabel: false,
  redraw: 'move'
}).addTo(map)

map.on('zoom', updatePositionText)
map.on('move', updatePositionText)

updatePositionText()
