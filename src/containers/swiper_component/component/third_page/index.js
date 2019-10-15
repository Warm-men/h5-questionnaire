import './index.scss'
import ajaxJsonp from 'src/lib/ajaxJsonp.js'
import * as storage from 'src/lib/storage.js'

class ThirdPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  componentDidMount() {
    this._queryQuiz()
  }
  _queryQuiz = () => {
    ajaxJsonp({
      url: '/api/Pintu/getQuestion',
      data: {
        token: storage.get('token', localStorage)
      },
      success: res => {
        // let { data } = res
        console.log(res)
      },
      error: e => {
        console.log(e)
      }
    })
  }
  render() {
    return (
      <div className="third-page-container">
        <div className="bg-image">
          <img src={require('./images/page3_bg.png')} alt="" />
        </div>
        <div className="third-wrapper">
          <div className="title-view">
            <img src={require('./images/page3_top_title.png')} alt="" />
          </div>
          <div className="sub-title-view">
            <img src={require('../first_page/images/title.png')} alt="" />
          </div>
        </div>
      </div>
    )
  }
}

export default ThirdPage
