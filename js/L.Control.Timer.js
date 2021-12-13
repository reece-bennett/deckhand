L.Control.Timer = L.Control.extend({
  onAdd: function (map) {
    const container = L.DomUtil.create('div', 'leaflet-bar')
    const button = L.DomUtil.create('a', 'material-icons-outlined', container)
    button.innerText = 'timer'
    button.href = '#'
    button.title = 'Timers'
    button.role = 'button'
    return container
  },

  onRemove: function (map) {

  }
})

L.control.timer = function (options) {
  return new L.Control.Timer(options)
}
