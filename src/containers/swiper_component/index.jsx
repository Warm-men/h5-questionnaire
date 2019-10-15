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

  componentDidMount() {
    wxInit()
    wx.ready(() => {
      this.onMenuShareTimeline()
      this.onMenuShareAppMessage()
    })
  }

  onMenuShareTimeline = () => {
    // NOTE:分享朋友圈
    wx.onMenuShareTimeline({
      title: '分享标题哈哈！', // 分享标题
      link: 'http://front.zhihui92.cn/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://h5.yypiano.cn/share_logo.png', // 分享图标
      success: () => {
        // 用户点击了分享后执行的回调函数
      },
      fail: res => {
        wxInit(true, this.onMenuShareTimeline)
      },
      trigger: () => {}
    })
  }

  onMenuShareAppMessage = () => {
    // NOTE：分享用户
    wx.onMenuShareAppMessage({
      title: '分享标题哈哈！', // 分享标题
      desc: '3.分享描述哈哈！', // 分享描述
      link: 'http://front.zhihui92.cn/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://h5.yypiano.cn/share_logo.png', // 分享图标
      success: () => {
        // 用户点击了分享后执行的回调函数
      },
      fail: res => {
        wxInit(true, this.onMenuShareAppMessage)
      }
    })
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
