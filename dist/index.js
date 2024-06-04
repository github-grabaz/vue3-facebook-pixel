import { inject as g } from "vue";
const d = Symbol("VueAnalyticsFbqKey"), p = [
  "AddPaymentInfo",
  "AddToCart",
  "AddToWishlist",
  "CompleteRegistration",
  "Contact",
  "CustomizeProduct",
  "Donate",
  "FindLocation",
  "InitiateCheckout",
  "Lead",
  "PageView",
  "Purchase",
  "Schedule",
  "Search",
  "StartTrial",
  "SubmitApplication",
  "Subscribe",
  "ViewContent"
], t = "[Vue fbq]: ", n = {
  debug: !1,
  excludes: []
}, u = () => {
  n.debug && console.warn(t + "Plugin injection failed!");
}, q = {
  init: () => u,
  event: () => u,
  query: () => u
}, s = () => typeof window.fbq > "u" ? (n.debug && console.warn(t + '"window.fbq" is not defined!'), !1) : !0, w = (e, o = {}) => {
  s() && (n.debug && console.log(`${t}Initializing app ${e}`), i("init", e, o));
}, x = (e, o = {}) => {
  s() && (n.debug && (console.groupCollapsed(`${t}Track event "${e}"`), console.log(`With data: ${o}`), console.groupEnd()), p.indexOf(e) === -1 ? i("trackCustom", e, o) : i("track", e, o));
}, i = (...e) => {
  s() && (n.debug && (console.groupCollapsed(t + "Raw query"), console.log("With data: ", ...e), console.groupEnd()), window.fbq(...e));
}, y = (e, o) => {
  const { router: c, debug: f, excludes: a } = o;
  n.excludes = a || n.excludes, n.debug = f;
  const r = { init: w, event: x, query: i };
  if (c && typeof c.afterEach == "function") {
    const { excludes: l } = n;
    c.afterEach(({ name: b }) => {
      l && l.indexOf(b) !== -1 || r.event("PageView");
    });
  }
  e.provide(d, r);
};
function C() {
  return g(d, q);
}
const P = { install: y };
export {
  P as VueFbq,
  C as useFbq
};
