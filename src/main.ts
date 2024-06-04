import { createApp } from 'vue'
import App from './App.vue'
import { VueFbq } from './plugin'

const app = createApp(App)
// Make sure you've pasted the fbq code into your index.html!
// https://developers.facebook.com/docs/meta-pixel/get-started
// usage:
app.use(VueFbq, {
  pixelId: 'your-pixel-id-goes-here',
  debug: true
})

app.mount('#app')
