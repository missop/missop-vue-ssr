export default {
  updateCountAsync (state, msg) {
    let i = 1
    setInterval(() => {
      state.commit('updateCount', i++)
    }, 1000)
  }
}
