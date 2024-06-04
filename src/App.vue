<template>
  <div>
    vue3-analytics-facebook-pixel
  </div>
  <button @click="trackPurchase">Purchase event</button>
</template>

<script setup lang="ts">
import { useFbq } from './plugin'

const fbq = useFbq()

const trackPurchase = () => {
  // test event
  fbq.event('Purchase', {
    currency: 'USD',
    value: '7.99'
  })
  // events reference: https://developers.facebook.com/docs/meta-pixel/reference
}
</script>

