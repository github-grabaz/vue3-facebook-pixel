import { createApp } from 'vue'
import App from './App.vue'
import fbqPlugin, { useFbq } from './plugin/fbq'

const app = createApp(App)
// install plugin
app.use(fbqPlugin, {
  debug: true
})

app.mount('#app')

// init fbq
const fbq = useFbq()

fbq?.init('your-pixel-id-goes-here')
