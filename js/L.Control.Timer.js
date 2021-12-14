L.Control.Timer = L.Control.extend({
  onAdd: function (map) {
    const container = L.DomUtil.create('div', 'control-timer control-timer--expanded')

    const openButton = L.DomUtil.create('a', 'control-timer__open-button material-icons-outlined', container)
    openButton.innerText = 'timer'
    openButton.href = '#'
    openButton.title = 'Timers'
    openButton.role = 'button'
    L.DomEvent.on(openButton, 'click', this._expand, this)

    const panel = L.DomUtil.create('section', 'control-timer__panel', container)

    const title = L.DomUtil.create('div', null, panel)
    title.innerText = 'Timers'

    const closeButton = L.DomUtil.create('a', 'control-timer__close-button material-icons-outlined', panel)
    closeButton.innerText = 'close'
    closeButton.href = '#'
    closeButton.role = 'button'
    L.DomEvent.on(closeButton, 'click', this._collapse, this)

    return container
  },

  onRemove: function (map) {

  },

  _expand: function () {
    L.DomUtil.addClass(this._container, 'control-timer--expanded')
  },

  _collapse: function () {
    L.DomUtil.removeClass(this._container, 'control-timer--expanded')
  }
})

L.control.timer = function (options) {
  return new L.Control.Timer(options)
}
