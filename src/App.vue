<template>
  <div>
    vue3-analytics-facebook-pixel
  </div>
  <button @click="purchase">Purchase event</button>
</template>

<script setup lang="ts">
import { useFbq } from './plugin/fbq'

const fbq = useFbq()

const purchase = () => {
  // test event
  fbq?.event('Purchase', {
    currency : 'USD',
    value: '7.99'
  })
  // events reference: https://developers.facebook.com/docs/meta-pixel/reference
}
</script>

