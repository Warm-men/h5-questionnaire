import './index.scss'

class SecondPage extends React.Component {
  render() {
    return (
      <div className="second-page-container">
        <img
          src={require('../first_page/images/page1_bg.png')}
          alt=""
          className="bg-image"
        />
        <div className="title-image">
          <img src={require('../first_page/images/title.png')} alt="" />
        </div>
        <div className="data-list-image">
          <img src={require('./images/page2_data_list.png')} alt="" />
        </div>
        <div className="coin-image">
          <img src={require('../first_page/images/page1_coin.png')} alt="" />
        </div>
        <div className="mouse-image">
          <img src={require('./images/page2_mouse_icon.png')} alt="" />
        </div>
        <div className="introdute-icon-image">
          <img src={require('./images/page2_introdute_icon.png')} alt="" />
        </div>
        <div className="men-image">
          <img src={require('./images/page2_men.png')} alt="" />
        </div>
        <div className="women-image">
          <img src={require('./images/page2_women.png')} alt="" />
        </div>
        <div className="fade-image">
          <img src={require('./images/page2_fade_img_icon.png')} alt="" />
        </div>
        <div className="plant-image">
          <img src={require('../first_page/images/plant.png')} alt="" />
        </div>
        <div className="bottom-button-image">
          <img src={require('./images/page2_bottom_button.png')} alt="" />
        </div>
      </div>
    )
  }
}

export default SecondPage
