import '../assets/styles/footer.less'

export default {
  data () {
    return {
      name: 'Jokcy'
    }
  },
  render () {
    return (
      <div id="footer">
        <span>created by {this.name}</span>
      </div>
    )
  }
}
