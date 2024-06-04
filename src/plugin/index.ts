import { inject } from 'vue'

import type { App, InjectionKey } from 'vue'

// Inspired by https://github.com/threadhandler/vue-analytics-facebook-pixel

// Vue plugin key
const PluginKey: InjectionKey<IFbqPlugin> = Symbol('Vue3AnalyticsFbqKey')

// Events: https://developers.facebook.com/docs/meta-pixel/reference
const fbqEvents = [
  'AddPaymentInfo', 'AddToCart', 'AddToWishlist',
  'CompleteRegistration', 'Contact', 'CustomizeProduct',
  'Donate',
  'FindLocation',
  'InitiateCheckout',
  'Lead',
  'PageView', 'Purchase',
  'Schedule', 'Search', 'StartTrial', 'SubmitApplication', 'Subscribe',
  'ViewContent'
]

const _eventsConst = [...fbqEvents] as const

export type TFbqEvents = typeof _eventsConst[number]

declare global {
  // Declaration for window.fbq()
  interface Window { fbq: Function }
}

interface IConfig {
  debug: boolean
  excludes?: string[]
  router?: any // 🤔
}

/**
 * Regular Object. Key: srting
 * Values reference: https://developers.facebook.com/docs/meta-pixel/reference#object-properties
 */
type TFbqDataSimpleValue = string | number | string[] | number[]
type TFbqData = Record<string, TFbqDataSimpleValue | Record<string, TFbqDataSimpleValue>[]>

interface IFbqPlugin {
  init(appId: string, data?: TFbqData): void
  event(name: string, data?: any): void
  query(): void
}

const _consolePrefix = '[Vue3 fbq]: '

// Configuration
const config: IConfig = {
  debug: false,
  excludes: []
}

const _injectionWarn = () => {
  if (config.debug) {
    console.warn(_consolePrefix + 'Plugin injection failed!')
  }
}

const _defaultValue: IFbqPlugin = {
  init: () => _injectionWarn,
  event: () => _injectionWarn,
  query: () => _injectionWarn
}

// Private function
const _fbqEnabled = (): boolean => {
  if (typeof window.fbq === 'undefined') {
    if (config.debug) {
      console.warn(_consolePrefix + '"window.fbq" is not defined!')
    }

    return false
  }

  return true
}

// Public functions

/**
 * Init facebook tracking pixel. Call it before using any other methods.
 */
const init = (appId: string, data: TFbqData = {}) => {
  if (!_fbqEnabled()) return

  if (config.debug) {
    console.log(`${_consolePrefix}Initializing app ${appId}`)
  }

  query('init', appId, data)
}

/**
 * Track event.
 */
const event = (name: TFbqEvents | string, data: TFbqData = {}) => {
  if (!_fbqEnabled()) return

  if (config.debug) {
    console.groupCollapsed(`${_consolePrefix}Track event "${name}"`)
    console.log(`With data: ${data}`)
    console.groupEnd()
  }

  if (fbqEvents.indexOf(name) === -1) {
    query('trackCustom', name, data)
  } else {
    query('track', name, data)
  }
}

/**
 * Submit a raw query to fbq, for when the wrapper limits user on what they need.
 * This makes it still possible to access the plain Analytics api.
 */
const query = (...args: any) => {
  if (!_fbqEnabled()) return

  if (config.debug) {
    console.groupCollapsed(_consolePrefix + 'Raw query')
    console.log('With data: ', ...args)
    console.groupEnd()
  }

  window.fbq(...args)
}

const install = (app: App, options: IConfig) => {
  const { router, debug, excludes } = options

  config.excludes = excludes || config.excludes
  config.debug = debug

  const fbq: IFbqPlugin = { init, event, query }

  // Support for vue-router:
  if (router && typeof router['afterEach'] === 'function') {
    const { excludes } = config

    router.afterEach(({ name }: any) => {
      if (excludes && excludes.indexOf(name) !== -1) {
        return
      }

      fbq.event('PageView')
    })
  }

  app.provide(PluginKey, fbq)
}

// Composable macro
export const useFbq = (): IFbqPlugin => {
  return inject<IFbqPlugin>(PluginKey, _defaultValue)
}
// TODO: readme.md before the first commit!
export default { install }
