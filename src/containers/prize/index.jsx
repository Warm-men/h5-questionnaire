import Helmet from 'src/lib/pagehelmet.js'
import wxInit from 'src/lib/wx_config.js'
import ajaxJsonp from 'src/lib/ajaxJsonp.js'
import * as storage from 'src/lib/storage.js'
import './index.scss'

class PrizeContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowBtn: false,
      recordId: storage.get('recordId'),
      isShowTips: false,
      winningCode: null
    }
  }

  componentDidMount() {
    ajaxJsonp({
      url: `/api/Question/getWinRecord`,
      data: {
        app_type: global.app_type
      },
      success: res => {
        if (res.code === 1 && res.data && res.data.winning_code) {
          this.setState({
            winningCode: res.data.winning_code,
            isShowBtn: true,
            isShowTips: false
          })
        }
      }
    })
    setTimeout(() => {
      wxInit()
      wx.ready(() => {
        this.onMenuShareTimeline()
      })
      wx.ready(() => {
        this.onMenuShareAppMessage()
      })
    }, 200)
  }

  onMenuShareTimeline = () => {
    // NOTE:分享朋友圈
    wx.onMenuShareTimeline({
      title: '中国支付清算协会联手财付通公司邀您共同参与3.15大型宣导活动！', // 分享标题
      link: 'http://h5.yypiano.cn/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://h5.yypiano.cn/share_logo.png', // 分享图标
      success: () => {
        // 用户点击了分享后执行的回调函数
        this.getTencentCode()
      },
      fail: res => {
        wxInit(true, this.onMenuShareTimeline)
      },
      trigger: () => {
        setTimeout(() => {
          this.getTencentCode()
        }, 1500)
      }
    })
  }

  onMenuShareAppMessage = () => {
    // NOTE：分享用户
    wx.onMenuShareAppMessage({
      title: '中国支付清算协会联手财付通公司邀您共同参与3.15大型宣导活动！', // 分享标题
      desc: '3.15大型宣导互动活动，中国支付清算协会联手财付通邀您共同参与！', // 分享描述
      link: 'http://h5.yypiano.cn/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://h5.yypiano.cn/share_logo.png', // 分享图标
      success: () => {
        // 用户点击了分享后执行的回调函数
        this.setState({
          isShowTips: false
        })
      },
      fail: res => {
        wxInit(true, this.onMenuShareAppMessage)
      }
    })
  }

  getTencentCode = () => {
    const { recordId } = this.state
    if (_.isEmpty(recordId)) {
      return null
    }
    ajaxJsonp({
      url: '/api/Question/builderWinCode',
      data: {
        record_id: this.state.recordId
      },
      success: res => {
        const { data, code } = res
        if (code === 1 && data) {
          this.setState({
            winningCode: data.winning_code,
            isShowBtn: true,
            isShowTips: false
          })
        }
      }
    })
  }

  handleOpenWarn = () => {
    this.setState({
      isShowTips: !this.state.isShowTips
    })
  }

  render() {
    const { isShowBtn, winningCode, isShowTips } = this.state
    const isShowWinningCode = isShowBtn && winningCode
    const convertStyle = isShowWinningCode
      ? 'convert'
      : 'convert convert-height'
    return (
      <div>
        <Helmet title="兑换界面" link="/prize" />
        <div className="prize-container">
          <img src={require('./images/bg1.jpg')} alt="" className="bg-image" />
          <div className={convertStyle}>
            <img
              src={require('./images/bg2.jpg')}
              alt=""
              className="bg2-image"
            />
            {isShowWinningCode && (
              <div className="bg2-wrapper">
                <div className="convert-text">兑换码</div>
                <div className="convert-number">{winningCode}</div>
              </div>
            )}
          </div>
          <img src={require('./images/bg3.jpg')} alt="" className="bg3" />
          <img
            onClick={this.handleOpenWarn}
            src={require('./images/prize_btn.png')}
            alt=""
            className="prize-btn"
          />
          {isShowTips && (
            <div className="warnning" onClick={this.handleOpenWarn}>
              <img
                className="ref-arrow"
                src={require('./images/referral-arrow.png')}
                alt="img..."
              />
              <p className="add-me">点击右上角分享邀请链接到朋友圈</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PrizeContainer
