import './index.scss'

class FirstPage extends React.Component {
  render() {
    return (
      <div className="first-page-container">
        <img
          src={require('./images/page1_bg.png')}
          alt=""
          className="bg-image"
        />
        <div className="title-image animate">
          <img src={require('./images/title.png')} alt="" />
        </div>

        <div className="coin-image">
          <img src={require('./images/page1_coin.png')} alt="" />
        </div>

        <div className="loop-book-image">
          <img src={require('./images/page1_loop_book.png')} alt="" />
        </div>

        <div className="coin-image">
          <img src={require('./images/page1_coin.png')} alt="" />
        </div>

        <div className="rocket-image">
          <img src={require('./images/page1_rocket.png')} alt="" />
        </div>

        <div className="plant-image">
          <img src={require('./images/plant.png')} alt="" />
        </div>
        <div className="arrow-image">
          <img src={require('./images/arrow_down.png')} alt="" />
        </div>
      </div>
    )
  }
}

export default FirstPage
