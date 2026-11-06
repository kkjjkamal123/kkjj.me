// Web Storage that never throws.
//
// With cookies/site data blocked (Safari "Block all cookies", some
// embedded webviews, sandboxed iframes) merely *reading*
// window.localStorage raises a SecurityError — and `typeof
// sessionStorage` does too, because the global's getter is what throws.
// Uncaught during the first render, that leaves the page blank. Every
// storage access in the app goes through here instead.

function store(kind) {
  try {
    const s = window[kind]
    return s || null
  } catch {
    return null
  }
}

export function getItem(kind, key) {
  try {
    const s = store(kind)
    return s ? s.getItem(key) : null
  } catch {
    return null
  }
}

export function setItem(kind, key, value) {
  try {
    const s = store(kind)
    if (s) s.setItem(key, value)
  } catch {
    /* blocked, full or private mode: not worth failing over */
  }
}
