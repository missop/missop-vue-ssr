import model from '../../model/client-model'

const handleError = (err) => {
//
}

export default {
  updateCountAsync(state, msg) {
    let i = 1
    setInterval(() => {
      state.commit('updateCount', i++)
    }, 1000)
  },
  fetchTodos({commit}) {
    return model.getAllTodos()
      .then(data => {
        commit('fillTodos', data)
      })
      .catch(err => {
        handleError(err)
      })
  }
}
