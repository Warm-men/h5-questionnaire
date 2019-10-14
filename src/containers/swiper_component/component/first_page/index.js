import './index.scss'

class FirstPage extends React.Component {
  componentDidMount() {}
  render() {
    const { currentPageIndex } = this.props
    const titleStyle =
      currentPageIndex === 0 ? 'jackInTheBox title-image' : 'title-image'
    const cloudStyle =
      currentPageIndex === 0 ? 'cloud-image fadeIn' : 'cloud-image'
    const rocketStyle =
      currentPageIndex === 0 ? 'rocket-image fadeInLeftBig' : 'rocket-image'
    return (
      <div className="first-page-container">
        <img
          src={require('./images/page1_bg.png')}
          alt=""
          className="bg-image"
        />
        <div className={titleStyle}>
          <img src={require('./images/title.png')} alt="" />
        </div>

        <div className="coin-image">
          <img src={require('./images/page1_coin.png')} alt="" />
        </div>

        <div className="loop-book-image">
          <img src={require('./images/page1_loop_book_v2.png')} alt="" />
        </div>

        <div className={cloudStyle}>
          <img src={require('./images/page1_cloud.png')} alt="" />
        </div>

        <div className="coin-image">
          <img src={require('./images/page1_coin.png')} alt="" />
        </div>

        <div className={rocketStyle}>
          <img src={require('./images/page1_rocket.png')} alt="" />
        </div>

        <div className="plant-image">
          <img src={require('./images/plant.png')} alt="" />
        </div>
        <div className="arrow-image fadeInDown">
          <img src={require('./images/arrow_down.png')} alt="" />
        </div>
      </div>
    )
  }
}

export default FirstPage
