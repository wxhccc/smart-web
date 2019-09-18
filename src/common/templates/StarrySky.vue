<template>
  <div class="starry-sky-comp" id="starry_sky">
  </div>
</template>

<script>
import Anicanvas from 'anicanvas'
export default {
  name: 'StarrySky',
  components: {
  },
  data () {
    return {
      stars: [],
      stage: null
    }
  },
  computed: {
  },
  mounted () {
    const { offsetWidth, offsetHeight } = this.$el
    this.stage = new Anicanvas('#starry_sky', { width: offsetWidth, height: offsetHeight })
    this.stageInit()
  },
  methods: {
    stageInit () {
      this.initStars()
      this.stage.start()
    },
    initStars () {
      for (let i = 0; i < 1200; i++) {
        const star = this.starCreator()
        this.stars.push(star)
        this.stage.append(star)
      }
    },
    starCreator (meteor) {
      const { width, height } = this.stage.$elemSize
      const opacity = 0.8 * Math.random()
      const starPainter = new Anicanvas.Painter((sprite, context, time, fdelta) => {
        let { left, top, width } = sprite
        context.save()
        context.beginPath()
        context.globalAlpha = sprite.opacity
        context.fillStyle = 'white'
        context.arc(left, top, width / 2, 0, Math.PI * 2)
        context.fill()
        context.restore()
      })
      const blink = new Anicanvas.Behavior({
        name: 'blink',
        duration: 1000 + 3000 * Math.random(),
        delay: 2000 * Math.random(),
        animation: {
          0: { opacity },
          50: { opacity: 0.1 },
          100: { opacity }
        },
        iteration: 'infinite'
      })
      let ballBehaviors = []
      opacity > 0.6 && ballBehaviors.push(blink)
      return new Anicanvas.Sprite('star', { left: width * Math.random(), top: height * Math.random(), width: 4 * Math.random(), opacity: opacity }, starPainter, ballBehaviors)
    }
  }
}
</script>
<style lang="scss" scoped>
.starry-sky-comp {
  width: 100%;
  height: 100%;
}
</style>
