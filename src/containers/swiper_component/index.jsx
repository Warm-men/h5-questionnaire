import { useState, useEffect } from 'react'
import Helmet from 'src/lib/pagehelmet.js'
import Swiper from 'react-id-swiper'
import './index.scss'
import 'react-id-swiper/lib/styles/css/swiper.css'
import { FirstPage, ThirdPage } from './component'
import useShare from 'src/hooks/useShare.js'

export default function IndexContainer(props) {
  const [currentPageIndex, setIndex] = useState(-1)
  const options = {
    direction: 'vertical',
    on: {
      slideNextTransitionEnd: () => setIndex(index => index + 1),
      slidePrevTransitionEnd: () => setIndex(index => index - 1)
    }
  }

  useShare()

  useEffect(() => {
    setIndex(0)
  }, [])

  return (
    <div className="home-container">
      <Helmet title="互联网金融消费知识小调研" link="/index" />
      <Swiper
        slideClass="custom-swiper-slide"
        wrapperClass="custom-swiper-wrapper"
        {...options}
      >
        <div className="swiper-image">
          <FirstPage currentPageIndex={currentPageIndex} />
        </div>
        <div className="swiper-image">
          <ThirdPage
            currentPageIndex={currentPageIndex}
            history={props.history}
          />
        </div>
      </Swiper>
    </div>
  )
}
