<script setup lang="ts">
  import ContentView from '@/components/navigation/ContentView.vue'
  import NavigationTitle from '@/components/navigation/NavigationTitle.vue'
  import NavBar from '@/components/premade/navbar/NavBar.vue'
  import createGlobe from 'cobe'
  import {onMounted, ref, watch} from 'vue'
  import Card from '@/components/layout/Card.vue'
  const canvasRef = ref<HTMLCanvasElement | null>(null)
  const isDarkMode = ref(0)

  let phi = 0
  let theta = 0.25
  let lastX = 0
  let velocity = 0
  let targetVelocity = 0.0015
  let isDragging = false

  let globe: any  = null

  const createGlobeInstance = () => {
    if (globe) globe.destroy()

    const canvas = canvasRef.value!
    const devicePixelRatio = window.devicePixelRatio || 1
    const width = canvas.offsetWidth * devicePixelRatio
    const height = canvas.offsetHeight * devicePixelRatio

    globe = createGlobe(canvas, {
      devicePixelRatio: devicePixelRatio,
      width: width,
      height: height,
      phi: 0,
      theta,
      dark: isDarkMode.value,
      diffuse: 1.4,
      mapSamples: 20000,
      mapBrightness: 6,
      baseColor: isDarkMode.value == 1 ? [0.32, 0.14, 0.93] : [0.42, 0.33, 0.7], // Dark : Light colors
      markerColor: [0.63, 0.49, 0.02],
      glowColor: [0.49, 0.43, 0.73],
      markers: [
        { location: [44.84685, 0.62871], size: 0.1 }, // Bordeaux
      ],
      onRender: (state) => {
        if (!isDragging) {
          velocity = targetVelocity
        }
        phi += velocity
        velocity *= 0.95
        state.phi = phi
        state.theta = theta
      }
    })
  }

  isDarkMode.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 1 : 0

  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      isDarkMode.value = e.matches ? 1 : 0
    })
  }

  onMounted(() => {
    createGlobeInstance()
    const canvas = document.getElementById("globe")

    watch(isDarkMode, () => {
      createGlobeInstance()
    })

    // Mouse drag listeners
    const onPointerDown = (e: PointerEvent) => {
      isDragging = true
      lastX = e.clientX
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - lastX
      lastX = e.clientX
      velocity = deltaX * 0.005
    }

    const onPointerUp = () => {
      isDragging = false
    }

    canvas?.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('resize', createGlobeInstance)

    return () => {
      globe.destroy()
      canvas?.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('resize', createGlobeInstance)
    }
  })
</script>

<template>
  <ContentView class="mapView">
    <NavigationTitle title="Map" />

    <Card>
      <canvas ref="canvasRef" id="globe" />
    </Card>

    <NavBar />
  </ContentView>
</template>

<style scoped lang="sass">
  #globe
    width: 100%
    height: 100%
    flex-grow: 1
</style>