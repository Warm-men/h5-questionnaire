import Helmet from 'src/lib/pagehelmet.js'
import wxInit from 'src/lib/wx_config.js'
import Swiper from 'react-id-swiper'
import './index.scss'
import 'react-id-swiper/lib/styles/css/swiper.css'
import { First, SecondPage, ThirdPage } from './component'
export default function IndexContainer(props) {
  const options = {
    direction: 'vertical'
  }

  return (
    <div className="home-container">
      <Helmet title="问卷" link="index" />
      <Swiper
        slideClass="custom-swiper-slide"
        wrapperClass="custom-swiper-wrapper"
        {...options}
      >
        <div className="swiper-image">
          <First />
        </div>
        <div className="swiper-image">
          <SecondPage />
        </div>
        <div className="swiper-image">
          <ThirdPage />
        </div>
      </Swiper>
    </div>
  )
}
