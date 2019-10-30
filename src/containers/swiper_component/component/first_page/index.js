import { useMemo } from 'react'
import './index.scss'

export default function FirstPage(props) {
  const { currentPageIndex } = props
  const pageStyle = useMemo(() => {
    if (currentPageIndex === 0) {
      return {
        titleStyle: 'heartBaet title-image',
        wemenImage: 'wemen-image fadeInLeft'
      }
    } else {
      return {
        titleStyle: 'title-image',
        wemenImage: 'wemen-image'
      }
    }
  }, [currentPageIndex])

  return (
    <div className="first-page-container">
      <img
        src={require('./images/home_page_bg.png')}
        alt=""
        className="bg-image"
      />
      <div className={pageStyle.titleStyle}>
        <img src={require('./images/home_page_title.png')} alt="" />
      </div>
      <div className="cell-phone-image">
        <img src={require('./images/home_page_cell_phone.png')} alt="" />
      </div>
      <div className={pageStyle.wemenImage}>
        <img src={require('./images/home_page_wemen.png')} alt="" />
      </div>
      <div className="arrow-image fadeInDown">
        <img src={require('./images/home_page_arrow.png')} alt="" />
      </div>
    </div>
  )
}
