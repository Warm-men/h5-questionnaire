import './index.scss'
import ajaxJsonp from 'src/lib/ajaxJsonp.js'
import * as storage from 'src/lib/storage.js'
import Helmet from 'src/lib/pagehelmet.js'
import ListItem from './quiz_list'

class ThirdPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isShowAlert: false,
      isShowFinishedAlert: false,
      showShareGuid: false
    }
    this.answer = []
  }
  componentDidMount() {
    this._queryQuiz()
  }
  _updateAnswer = (id, key, category_id) => {
    if (!id) return
    const index = this.answer.findIndex(item => item.id === id)

    if (index !== -1) {
      this.answer[index] = { id, user_answer: key, category_id }
    } else {
      this.answer.push({ id, user_answer: key, category_id })
    }
  }
  _queryQuiz = () => {
    ajaxJsonp({
      url: '/api/Pintu/getQuestion',
      data: { token: storage.get('token', localStorage) },
      method: 'POST',
      success: res => {
        this.timer = null
        let { data } = res
        this.setState({ data })
      },
      error: e => {
        this.timer = setTimeout(this._queryQuiz, 2000)
      }
    })
  }

  _checkFinishedQuiz = () => {
    let quizList = []
    this.state.data.map(item => {
      return item.list && (quizList = [...quizList, ...item.list])
    })
    let textQuizCount = 0
    quizList.map(item => item.category_id === 2 && textQuizCount++) //选填题目数目
    const resultLength = this.answer.length
    if (resultLength <= quizList.length - textQuizCount) {
      const ids = this.answer.map(item => item.id)
      const unRequiredQuiz = quizList.filter(item => !ids.includes(item.id))
      const unRequiredQuizIdIndex = unRequiredQuiz.findIndex(
        item => item.category_id === 1 || item.category_id === 3
      )
      if (unRequiredQuizIdIndex !== -1) {
        //未完成单选题
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  }

  _showAlert = () =>
    this.setState({ isShowAlert: true }, () => {
      setTimeout(this._hideAlert, 2000)
    })

  _hideAlert = () => this.setState({ isShowAlert: false })

  _submitQuiz = () => {
    if (this.isLoading) return null
    const isFinishedQuiz = this._checkFinishedQuiz()
    if (!isFinishedQuiz) {
      this._showAlert()
      return null
    }
    this.isLoading = true

    ajaxJsonp({
      url: '/api/Pintu/subQuestion',
      data: {
        token: storage.get('token', localStorage),
        params: {
          answer: JSON.stringify(this.answer)
        }
      },
      method: 'POST',
      success: res => {
        this._hanldeFinishedSub()
        this.isLoading = false
      },
      error: () => {
        this.isLoading = false
      }
    })
  }

  _hanldeFinishedSub = () => this.setState({ isShowFinishedAlert: true })

  _onClosePage = () => {
    this.setState({ isShowFinishedAlert: false, showShareGuid: false }, () => {
      this.props.history.push('/index')
    })
  }

  _openGuid = () => this.setState({ showShareGuid: true })

  render() {
    const { data, isShowAlert, isShowFinishedAlert, showShareGuid } = this.state
    if (!data.length) return null
    return (
      <div className="third-page-container">
        <Helmet title="互联网金融消费知识小调研" link="/quiz" />
        {isShowAlert ? (
          <div className="hidden-view">
            <div className="text-view">请回答完题目再提交哦!</div>
          </div>
        ) : null}
        {isShowFinishedAlert ? (
          <div className="finished-view">
            <div className="image-view">
              <div className="close-button" onClick={this._onClosePage} />
              <img src={require('./images/finished_image.png')} alt="" />
              <div className="open-guid" onClick={this._openGuid} />
            </div>
            {showShareGuid ? (
              <div className="guid-view">
                <img src={require('./images/share_arrow.png')} alt="" />
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="bg-image">
          <img src={require('./images/page3_bg.png')} alt="" />
        </div>
        <div>
          <div className="title-view">
            <img
              src={require('../swiper_component/component/second_page/images/super_title.png')}
              alt=""
            />
          </div>
          <div className="sub-title-view">
            <img
              src={require('../../containers/swiper_component/component/second_page/images/title.png')}
              alt=""
            />
          </div>
        </div>
        {data.map((item, index) => {
          return (
            <ListItem
              item={item}
              updateAnswer={this._updateAnswer}
              key={index}
              index={index}
            />
          )
        })}
        <div className="submit-button-view">
          <div className="button-view" onClick={this._submitQuiz}>
            <img src={require('./images/submit_button.jpg')} alt="" />
          </div>
        </div>
      </div>
    )
  }
}

export default ThirdPage
