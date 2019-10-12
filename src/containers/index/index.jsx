import Helmet from 'src/lib/pagehelmet.js'
import wxInit from 'src/lib/wx_config.js'
import 'src/containers/index/index.scss'

class IndexContainer extends React.Component {
  componentDidMount() {
    wxInit()
    wx.ready(() => {
      // NOTE:分享朋友圈
      wx.onMenuShareTimeline({
        title: '中国支付清算协会联手财付通公司邀您共同参与3.15大型宣导活动!', // 分享标题
        link: 'http://h5.yypiano.cn/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://h5.yypiano.cn/share_logo.png', // 分享图标
        success: () => {
          // 用户点击了分享后执行的回调函数
        }
      })
    })
    wx.ready(() => {
      // NOTE：分享用户
      wx.onMenuShareAppMessage({
        title: '中国支付清算协会联手财付通公司邀您共同参与3.15大型宣导活动!', // 分享标题
        desc: '3.15大型宣导互动活动，中国支付清算协会联手财付通邀您共同参与！', // 分享描述
        link: 'http://h5.yypiano.cn/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://h5.yypiano.cn/share_logo.png', // 分享图标
        success: () => {
          // 用户点击了分享后执行的回调函数
        }
      })
    })
  }

  next = () => {
    this.props.history.push('/introduce')
  }

  render() {
    return (
      <div className="home-container">
        <Helmet title="首页" link="index" />
        <img
          src={require('./images/home_bg.jpg')}
          alt=""
          className="bg-image"
        />
        <img
          src={require('./images/home_btn.png')}
          alt=""
          className="btn-image"
          onClick={this.next}
        />
      </div>
    )
  }
}

export default IndexContainer
