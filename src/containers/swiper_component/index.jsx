import Helmet from 'src/lib/pagehelmet.js'
import wxInit from 'src/lib/wx_config.js'
import Swiper from 'react-id-swiper'
import './index.scss'
import 'react-id-swiper/lib/styles/css/swiper.css'
import { First, SecondPage } from './component'
export default class IndexContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPageIndex: 0
    }
    this.options = {
      direction: 'vertical',
      on: {
        slideNextTransitionEnd: this._slideNextTransitionEnd,
        slidePrevTransitionEnd: this._slidePrevTransitionEnd
      }
    }
  }
  _slideNextTransitionEnd = () => {
    this.setState({ currentPageIndex: this.state.currentPageIndex + 1 })
  }

  _slidePrevTransitionEnd = () =>
    this.setState({ currentPageIndex: this.state.currentPageIndex - 1 })

  render() {
    const { currentPageIndex } = this.state
    return (
      <div className="home-container">
        <Helmet title="问卷" link="index" />
        <Swiper
          slideClass="custom-swiper-slide"
          wrapperClass="custom-swiper-wrapper"
          {...this.options}
        >
          <div className="swiper-image">
            <First currentPageIndex={currentPageIndex} />
          </div>
          <div className="swiper-image">
            <SecondPage
              currentPageIndex={currentPageIndex}
              history={this.props.history}
            />
          </div>
          {/* <div className="swiper-image">
            <ThirdPage currentPageIndex={currentPageIndex} />
          </div> */}
        </Swiper>
      </div>
    )
  }
}
