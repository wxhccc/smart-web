import Vue from 'vue'
import store from '@/store'
// import the apis which need prepare before admin layout render


export default function (to, from, next) {
  next()
  /*
  const { appConfig } = store.getters
  if (appConfig.__dynamic) {
    next()
  } else {
    let queue = []
    !appConfig.__dynamic && queue.push(Vue.prototype.$fetch(getDynaAppConfig).promise())
    // add more apis request
    Promise.all(queue).then(results => {
      // results[0] && store.commit('SET_APP_CONFIG', Object.assign({ '__dynamic': true }, results[0])
    }).catch(e => { console.log(e) }).finally(next)
  }
  */
}
