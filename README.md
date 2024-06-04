# Vue 3 Facebook Pixel
Tiny wrapper around Facebook Pixel API for Vue 3.

## Prerequisites
To use this plugin you need an installed [Facebook Pixel](https://developers.facebook.com/docs/meta-pixel/get-started).

## Install
With NPM:
```bash
$ npm install TODO
```

## Usage

### Vue 3 Composition API

**main.js**
```js
import { createApp } from 'vue'
import { VueFbq } from 'TODO'

import App from './App.vue'

const app = createApp(App)
  
app.use(VueFbq, { pixelId: 'your-pixel-id', debug: true })
```

**MyComponent.vue**
```js
<script setup>
import { useFbq } from 'TODO'

const fbq = useFbq()

const trackPurchase = () => {
  // events reference: https://developers.facebook.com/docs/meta-pixel/reference
  fbq.event('Purchase', {
    currency: 'USD',
    value: '7.99'
  })
}
</script>
```