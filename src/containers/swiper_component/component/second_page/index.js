import './index.scss'

class SecondPage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isShowIntroduction: false
    }
  }
  _showInroduction = () => this.setState({ isShowIntroduction: true })
  _hideInroduction = () => this.setState({ isShowIntroduction: false })
  render() {
    const { currentPageIndex } = this.props
    const onFocus = currentPageIndex === 1
    const titleStyle = onFocus ? 'jackInTheBox title-image' : 'title-image'
    const bottomButtonStyle = onFocus
      ? 'bottom-button-image slideInDown'
      : 'bottom-button-image'
    const dataListStyle = onFocus ? 'jello data-list-image' : 'data-list-image'
    const menStyle = onFocus ? 'men-image shake' : 'men-image'
    const introduteIconStyle = onFocus
      ? 'introdute-icon-image fadeIn'
      : 'introdute-icon-image'
    const mouseStyle = onFocus ? 'mouse-image fadeIn' : 'mouse-image'
    const womenStyle = onFocus ? 'women-image slideInLeft' : 'mouse-image'
    return (
      <div className="second-page-container">
        <img
          src={require('../first_page/images/page1_bg.png')}
          alt=""
          className="bg-image"
        />
        <div className={titleStyle}>
          <img src={require('../first_page/images/title.png')} alt="" />
        </div>
        <div className={dataListStyle}>
          <img src={require('./images/page2_data_list.png')} alt="" />
        </div>
        <div className="coin-image">
          <img src={require('../first_page/images/page1_coin.png')} alt="" />
        </div>
        <div onClick={this._showInroduction} className={mouseStyle}>
          <img src={require('./images/page2_mouse_icon.png')} alt="" />
        </div>
        <div onClick={this._showInroduction} className={introduteIconStyle}>
          <img src={require('./images/page2_introdute_icon.png')} alt="" />
        </div>
        <div className={menStyle}>
          <img src={require('./images/page2_men.png')} alt="" />
        </div>
        <div className={womenStyle}>
          <img src={require('./images/page2_women.png')} alt="" />
        </div>
        <div className="fade-image">
          <img src={require('./images/page2_fade_img_icon.png')} alt="" />
        </div>
        <div className="plant-image">
          <img src={require('../first_page/images/plant.png')} alt="" />
        </div>
        <div className={bottomButtonStyle}>
          <img src={require('./images/page2_bottom_button.png')} alt="" />
        </div>
        {this.state.isShowIntroduction ? (
          <div className="pop-wrapper-view">
            <div className={'introduction-image fadeIn'}>
              <div className="hide-button" onClick={this._hideInroduction} />
              <img src={require('./images/page2_introdution_pop.png')} alt="" />
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default SecondPage
