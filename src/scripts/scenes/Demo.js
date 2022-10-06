import Slider from '../../core/ui/Slider'
import Slider2 from '../../../uidemo/phaser3-rex-notes/plugins/input/slider/Slider'

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
  new(x, y, width, height) {
    const img = this.add.rectangle(x, y, 40, 40, 0xffffff)
    const slider = (this.slider1 = new Slider(
      img,
      {
        x: img.x,
        y: img.y
      },
      {
        x: img.x + width,
        y: img.y + height
      },
      {
        min: 50,
        max: 150
      }
    ))
    this.add.existing(slider)
    this.add.graphics().lineStyle(3, 0x55ff55, 1).strokePoints([slider.startPoint, slider.endPoint])
    const text = this.add.text(0, 0, '', {
      fontSize: '20px'
    })
    return {
      slider,
      text
    }
  }
  create() {
    this.new(100, 200, 0, -100)
    this.new(300, 100, 150, 0)
    // this.new(500, 100, 150, 150)
    // this.new(700, 200, 0, -150)
    // this.new(900, 100, -150, 0)
    const slider1 = () => {
      const img = this.add.rectangle(900, 200, 40, 40, 0xffffff)
      const slider = new Slider2(img, {
        endPoints: [
          {
            x: img.x,
            y: img.y
          },
          {
            x: img.x + 200,
            y: img.y + 200
          }
        ]
      })
      this.add.graphics().lineStyle(3, 0x55ff55, 1).strokePoints(slider.endPoints)
    }

    const slider2 = () => {
      const img2 = this.add.rectangle(700, 200, 40, 40, 0xffffff)
      const slider2 = new Slider(
        img2,
        {
          x: img2.x + 200,
          y: img2.y + 200
        },
        {
          x: img2.x,
          y: img2.y
        }
      )
      this.add.existing(slider2)
      this.add.graphics().lineStyle(3, 0x55ff55, 1).strokePoints([slider2.startPoint, slider2.endPoint])
    }

    slider2()
    slider1()
  }

  update() {
    // if (this.cursorKeys.left.isDown) {
    //   this.slider1.value -= 0.01
    //   this.slider2.value -= 0.01
    //   this.slider3.value -= 0.01
    //   this.slider4.value -= 0.01
    // } else if (this.cursorKeys.right.isDown) {
    //   this.slider1.value += 0.01
    //   this.slider2.value += 0.01
    //   this.slider3.value += 0.01
    //   this.slider4.value += 0.01
    // }
    // this.text.setText(this.slider1.value)
    // this.text2.setText(this.slider2.value)
    // this.text3.setText(this.slider3.value)
    // this.text4.setText(this.slider4.value)
  }
}
