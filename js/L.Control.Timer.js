L.Control.Timer = L.Control.extend({
  _stageNames: [
    'Cooking',
    'Burning',
    'Igniting',
    'Fire!'
  ],

  _stageClasses: [
    'control-timer--cooking',
    'control-timer--burning',
    'control-timer--igniting',
    'control-timer--fire'
  ],

  _cookingTimes: {
    fish: 40000,
    trophyFish: 90000,
    meat: 60000,
    monster: 120000
  },

  onAdd: function (map) {
    const container = L.DomUtil.create('div', 'control-timer')

    const openButton = L.DomUtil.create('a', 'control-timer__open-button material-icons-outlined', container)
    openButton.innerText = 'timer'
    openButton.href = '#'
    openButton.title = 'Timer'
    openButton.role = 'button'
    L.DomEvent.on(openButton, 'click', this._expand, this)

    const panel = L.DomUtil.create('section', 'control-timer__panel', container)

    const header = L.DomUtil.create('div', 'control-timer__header', panel)

    const title = L.DomUtil.create('div', 'control-timer__title', header)
    title.innerText = 'Timer'

    const closeButton = L.DomUtil.create('button', 'control-timer__close-button material-icons-outlined', header)
    closeButton.innerText = 'close'
    L.DomEvent.on(closeButton, 'click', () => this._collapse())

    const startButtonContainer = L.DomUtil.create('div', 'control-timer__start-button-container', panel)

    const fishButton = L.DomUtil.create('button', 'control-timer__start-button', startButtonContainer)
    fishButton.innerText = 'Fish'
    L.DomEvent.on(fishButton, 'click', () => this._start('fish'))

    const trophyFishButton = L.DomUtil.create('button', 'control-timer__start-button', startButtonContainer)
    trophyFishButton.innerText = 'Trophy fish'
    L.DomEvent.on(trophyFishButton, 'click', () => this._start('trophyFish'))

    const meatButton = L.DomUtil.create('button', 'control-timer__start-button', startButtonContainer)
    meatButton.innerText = 'Meat'
    L.DomEvent.on(meatButton, 'click', () => this._start('meat'))

    const monsterButton = L.DomUtil.create('button', 'control-timer__start-button', startButtonContainer)
    monsterButton.innerText = 'Kraken/Meg'
    L.DomEvent.on(monsterButton, 'click', () => this._start('monster'))

    const timer = L.DomUtil.create('div', 'control-timer__timer', panel)
    this._status = L.DomUtil.create('div', 'control-timer__status', timer)
    this._progress = L.DomUtil.create('div', 'control-timer__progress', timer)

    const cancelButton = L.DomUtil.create('button', 'control-timer__cancel-button material-icons-outlined', timer)
    cancelButton.innerText = 'cancel'
    L.DomEvent.on(cancelButton, 'click', () => this._cancel())

    return container
  },

  onRemove: function (map) {

  },

  _expand: function () {
    L.DomUtil.addClass(this._container, 'control-timer--expanded')
  },

  _collapse: function () {
    L.DomUtil.removeClass(this._container, 'control-timer--expanded')
  },

  _start: function (type) {
    const cookingTime = this._cookingTimes[type]
    const now = Date.now()
    this._startTime = now
    this._stage = 0
    this._stages = [
      now + cookingTime,
      now + cookingTime * 2,
      now + cookingTime * 2 + 300000
    ]
    L.DomUtil.addClass(this._container, 'control-timer--running')
    L.DomUtil.addClass(this._container, this._stageClasses[0])
    this._update()
  },

  _update: function () {
    const now = Date.now()
    if (this._remaining < 1000) {
      this._stage++
      this._startTime = now
      this._stageClasses.forEach(c => L.DomUtil.removeClass(this._container, c))
      L.DomUtil.addClass(this._container, this._stageClasses[this._stage])
    }
    this._remaining = this._stages[this._stage] - now
    this._draw()
    if (this._stage < 3) {
      this._timeoutId = setTimeout(() => this._update(), 1000)
    } else {
      this._remaining = 0
    }
  },

  _draw: function () {
    this._status.innerText = this._stageNames[this._stage]
    if (this._stage < 3) {
      const s = this._remaining / 1000
      this._progress.innerText = `${Math.floor(s / 60)}:${Math.round(s % 60).toString().padStart(2, '0')}`
      this._progress.style.setProperty('--p', (this._remaining / (this._stages[this._stage] - this._startTime)) * 100 + '%')
    } else {
      this._progress.innerText = '🔥'
    }
  },

  _cancel: function () {
    L.DomUtil.removeClass(this._container, 'control-timer--running')
    this._stageClasses.forEach(c => L.DomUtil.removeClass(this._container, c))
    clearTimeout(this._timeoutId)
  }
})

L.control.timer = function (options) {
  return new L.Control.Timer(options)
}
