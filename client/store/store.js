import Vuex from 'vuex'
import Vue from 'vue'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

Vue.use(Vuex)

export default () => {
  const store = new Vuex.Store({
    state: defaultState,
    mutations,
    getters,
    actions,
    plugins: [
      (store) => {
        console.log('my plugin invoked')
      }
    ]
    // modules: {
    //   a: {
    //     namespaced: true,
    //     state: {
    //       text: 1
    //     },
    //     mutations: {
    //       updateText (state, text) {
    //         state.text = text
    //       }
    //     },
    //     getters: {
    //       newTextA (state, getters, rootState) {
    //         return state.text + 'abc' + ' count:' + rootState.count
    //       }
    //     },
    //     actions: {
    //       add ({state, commit, rootState}) {
    //         commit('updateCount', 198, {root: true})
    //       }
    //     },
    //     modules: {
    //       aChild: {
    //         namespaced: true,
    //         state: {
    //           test: '.className'
    //         },
    //         mutations: {
    //           changeTest (state, newTest) {
    //             state.test += newTest
    //           }
    //         },
    //         getters: {
    //           newTest (state, getters, rootSate) {
    //             return '获取类名为className的元素:document.querySelector(' + state.test + ')'
    //           }
    //         }
    //       }
    //     }
    //   },
    //   b: {
    //     state: {
    //       text: 2
    //     }
    //   }
    // }
  })

  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }

  return store
}
