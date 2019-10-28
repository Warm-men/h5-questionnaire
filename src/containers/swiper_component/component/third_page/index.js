import { useMemo, useState } from 'react'
import './index.scss'

export default function ThirdPage(props) {
  const { currentPageIndex } = props
  const [showInroduction, setShowInroduction] = useState(false)
  const pageStyle = useMemo(() => {
    if (currentPageIndex === 2) {
      return {
        titleStyle: 'jackInTheBox title-image',
        bottomButtonStyle: 'bottom-button-image slideInDown',
        dataListStyle: 'jello data-list-image',
        menStyle: 'men-image shake',
        introduteIconStyle: 'introdute-icon-image fadeIn',
        mouseStyle: 'mouse-image fadeIn',
        womenStyle: 'women-image slideInLeft'
      }
    } else {
      return {
        titleStyle: 'title-image',
        bottomButtonStyle: 'bottom-button-image',
        dataListStyle: 'data-list-image',
        menStyle: 'men-image',
        introduteIconStyle: 'introdute-icon-image',
        mouseStyle: 'mouse-image',
        womenStyle: 'women-image'
      }
    }
  }, [currentPageIndex])

  const _showInroduction = () => setShowInroduction(true)
  const _hideInroduction = () => setShowInroduction(false)
  const goQuizPage = () => props.history.push('/quiz')
  return (
    <div className="third-page-container">
      <img
        src={require('../second_page/images/commem_bg.jpg')}
        alt=""
        className="bg-image"
      />
      <div className="super-title-image">
        <img src={require('../second_page/images/super_title.png')} alt="" />
      </div>
      <div className={pageStyle.titleStyle}>
        <img src={require('../second_page/images/title.png')} alt="" />
      </div>
      <div className={pageStyle.dataListStyle}>
        <img src={require('./images/page2_data_list.png')} alt="" />
      </div>
      <div className="coin-image">
        <img src={require('../second_page/images/page1_coin.png')} alt="" />
      </div>
      <div onClick={_showInroduction} className={pageStyle.mouseStyle}>
        <img src={require('./images/page2_mouse_icon.png')} alt="" />
      </div>
      <div onClick={_showInroduction} className={pageStyle.introduteIconStyle}>
        <img src={require('./images/page2_introdute_icon.png')} alt="" />
      </div>
      <div className={pageStyle.menStyle}>
        <img src={require('./images/page2_men.png')} alt="" />
      </div>
      <div onAnimationEnd={_showInroduction} className={pageStyle.womenStyle}>
        <img src={require('./images/page2_women.png')} alt="" />
      </div>
      <div className="fade-image">
        <img src={require('./images/page2_fade_img_icon.png')} alt="" />
      </div>
      <div className="plant-image">
        <img src={require('../second_page/images/plant_v2.png')} alt="" />
      </div>
      <div className={pageStyle.bottomButtonStyle} onClick={goQuizPage}>
        <img src={require('./images/page2_bottom_button.png')} alt="" />
      </div>
      {showInroduction ? (
        <div className="pop-wrapper-view">
          <div className={'introduction-image fadeIn'}>
            <div className="hide-button" onClick={_hideInroduction} />
            <img src={require('./images/page2_introdution_pop.png')} alt="" />
          </div>
        </div>
      ) : null}
    </div>
  )
}
