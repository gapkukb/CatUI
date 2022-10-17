import Scroller from '../../core/Scroller/Scroller'
import Scroller2 from '../../../uidemo/phaser3-rex-notes/plugins/input/scroller/Scroller'
const pad = Phaser.Utils.String.Pad
const slidingDeceleration = 5000
const backDeceleration = 2000
export default class Demo extends Phaser.Scene {
  constructor() {
    super({
      key: 'examples'
    })
  }

  preload() {
    this.load.plugin(
      'rexsliderplugin',
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js',
      true
    )
  }

  new1() {
    var x = 200,
      y = 300,
      w = 300,
      h = 400
    var topY = y - h / 2,
      leftX = x - w / 2
    var bg = this.add
      .graphics()
      .setPosition(leftX, topY)
      .fillStyle(0x000033, 1)
      .fillRect(0, 0, w, h)
      .setInteractive(new Phaser.Geom.Rectangle(0, 0, w, h), Phaser.Geom.Rectangle.Contains)

    var s = ''
    for (var i = 0, cnt = 300; i < cnt; i++) {
      s += pad(i.toString(), 4, '0', 1)
      if (i < cnt - 1) {
        s += '\n'
      }
    }

    var txt = this.add.text(leftX, topY, s, {})
    txt.setMask(bg.createGeometryMask())

    var topBound = topY,
      bottomBound
    var contentHieght = txt.height
    if (contentHieght > h) {
      // over a page
      bottomBound = topY - contentHieght + h
    } else {
      bottomBound = topY
    }

    this.scroller = new Scroller(bg, {
      bounds: [bottomBound, topBound],
      value: topBound,
      slidingDeceleration: slidingDeceleration,
      backDeceleration: backDeceleration,

      valuechangeCallback: function (newValue) {
        txt.y = newValue
      }
    })
    this.add.existing(this.scroller)
    this.scrollerState = this.add.text(0, 0, '123')
  }

  new2() {
    var x = 600,
      y = 300,
      w = 300,
      h = 400
    var topY = y - h / 2,
      leftX = x - w / 2
    var bg = this.add
      .graphics()
      .setPosition(leftX, topY)
      .fillStyle(0x000033, 1)
      .fillRect(0, 0, w, h)
      .setInteractive(new Phaser.Geom.Rectangle(0, 0, w, h), Phaser.Geom.Rectangle.Contains)

    var s = ''
    for (var i = 0, cnt = 300; i < cnt; i++) {
      s += pad(i.toString(), 4, '0', 1)
      if (i < cnt - 1) {
        s += '\n'
      }
    }

    var txt = this.add.text(leftX, topY, s, {})
    txt.setMask(bg.createGeometryMask())

    var topBound = topY,
      bottomBound
    var contentHieght = txt.height
    if (contentHieght > h) {
      // over a page
      bottomBound = topY - contentHieght + h
    } else {
      bottomBound = topY
    }

    this.scroller2 = new Scroller2(bg, {
      bounds: [bottomBound, topBound],
      value: topBound,
      slidingDeceleration: slidingDeceleration,
      backDeceleration: backDeceleration,

      valuechangeCallback: function (newValue) {
        txt.y = newValue
      }
    })
    this.add.existing(this.scroller2)
    this.scrollerState2 = this.add.text(500, 0, '')
  }

  create() {
    this.new1()
    this.new2()
  }
  update(time, delta) {
    this.scrollerState.text = this.scroller.status + '\n' + this.scroller.value + '\n' + this.scroller.dragManager.state
    this.scrollerState2.text = this.scroller2.state + '\n' + this.scroller2.value
  }
}
