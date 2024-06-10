import { inject as p } from "vue";
const d = Symbol("VueAnalyticsFbqKey"), q = [
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
  pixelId: "",
  debug: !1,
  excludes: []
}, r = () => {
  n.debug && console.warn(t + "Plugin injection failed!");
}, w = {
  event: () => r,
  query: () => r
}, u = () => typeof window.fbq > "u" ? (n.debug && console.warn(t + '"window.fbq" is not defined!'), !1) : !0, x = (e) => {
  u() && (n.debug && console.log(`${t}Initializing app ${e}`), i("init", e));
}, y = (e, o = {}) => {
  u() && (n.debug && (console.groupCollapsed(`${t}Track event "${e}"`), console.log(`With data: ${o}`), console.groupEnd()), q.indexOf(e) === -1 ? i("trackCustom", e, o) : i("track", e, o));
}, i = (...e) => {
  u() && (n.debug && (console.groupCollapsed(t + "Raw query"), console.log("With data: ", ...e), console.groupEnd()), window.fbq(...e));
}, h = (e, o) => {
  const { pixelId: f, debug: a, router: c, excludes: b } = o;
  n.excludes = b || n.excludes, n.debug = a;
  const s = { event: y, query: i };
  if (x(f), c && typeof c.afterEach == "function") {
    const { excludes: l } = n;
    c.afterEach(({ name: g }) => {
      l && l.indexOf(g) !== -1 || s.event("PageView");
    });
  }
  e.provide(d, s);
};
function P() {
  return p(d, w);
}
const V = { install: h };
export {
  V as VueFbq,
  P as useFbq
};
