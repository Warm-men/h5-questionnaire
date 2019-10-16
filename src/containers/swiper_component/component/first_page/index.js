import { useMemo } from 'react'
import './index.scss'

export default function FirstPage(props) {
  const { currentPageIndex } = props
  const pageStyle = useMemo(() => {
    if (currentPageIndex === 0) {
      return {
        titleStyle: 'jackInTheBox title-image',
        cloudStyle: 'cloud-image fadeIn',
        rocketStyle: 'rocket-image fadeInLeftBig'
      }
    } else {
      return {
        titleStyle: 'title-image',
        cloudStyle: 'cloud-image',
        rocketStyle: 'rocket-image'
      }
    }
  }, [currentPageIndex])

  return (
    <div className="first-page-container">
      <img src={require('./images/page1_bg.png')} alt="" className="bg-image" />
      <div className={pageStyle.titleStyle}>
        <img src={require('./images/title.png')} alt="" />
      </div>
      <div className="coin-image">
        <img src={require('./images/page1_coin.png')} alt="" />
      </div>
      <div className="loop-book-image">
        <img src={require('./images/page1_loop_book_v2.png')} alt="" />
      </div>
      <div className={pageStyle.cloudStyle}>
        <img src={require('./images/page1_cloud.png')} alt="" />
      </div>
      <div className="coin-image">
        <img src={require('./images/page1_coin.png')} alt="" />
      </div>
      <div className={pageStyle.rocketStyle}>
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
