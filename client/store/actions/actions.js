import model from '../../model/client-model'
import notify from '../../components/notification/fn'
import bus from '../../util/bus'

const handleError = (err) => {
//handleError
  if (err.code === 401) {
    notify({
      content: ' 请先登录哦~~~~'
    })
    bus.$emit('auth')
  }
}

export default {
  updateCountAsync(state, msg) {
    let i = 1
    setInterval(() => {
      state.commit('updateCount', i++)
    }, 1000)
  },
  fetchTodos({commit}) {
    commit('startLoading')
    model.getAllTodos()
      .then(data => {
        commit('endLoading')
        commit('fillTodos', data)
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  addTodo({commit}, todo) {
    commit('startLoading')
    model.createTodo(todo)
      .then(data => {
        commit('addTodo', data)
        commit('endLoading')
        notify({
          content: '又多了一件事要做哦~~~'
        })
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  updateTodo({commit}, {id, todo}) {
    commit('startLoading')
    model.updateTodo(id, todo)
      .then(data => {
        commit('updateTodo', {id, todo: data})
        commit('endLoading')
        notify({
          content: '事情有更改~~~'
        })
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  deleteTodo({commit}, id) {
    commit('startLoading')
    model.deleteTodo(id)
      .then(() => {
        commit('deleteTodo', id)
        commit('endLoading')
        notify({
          content: '好开心，少了一件事情~~~'
        })
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  deleteAllCompleted({commit, state}) {
    commit('startLoading')
    const ids = state.todos.filter(t => t.completed).map(t => t.id)
    model.deleteAllCompleted(ids)
      .then(() => {
        commit('deleteAllCompleted', ids)
        commit('endLoading')
        notify({
          content: '清理一下~~~'
        })
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  login({commit}, {username, password}) {
    commit('startLoading')
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          commit('doLogin', data)
          commit('endLoading')
          notify({
            content: '登陆成功'
          })
          resolve()
        })
        .catch(err => {
          commit('endLoading')
          handleError(err)
          reject(err)
        })
    })
  }
}
