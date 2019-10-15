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
      isShowAlert: false
    }
    this.answer = []
  }
  componentDidMount() {
    this._queryQuiz()
  }
  _updateAnswer = (id, key) => {
    if (!id) return
    const index = this.answer.findIndex(item => item.id === id)

    if (index !== -1) {
      this.answer[index] = { id, user_answer: key }
    } else {
      this.answer.push({ id, user_answer: key })
    }
  }
  _queryQuiz = () => {
    ajaxJsonp({
      url: '/api/Pintu/getQuestion',
      data: { token: storage.get('token', localStorage) },
      success: res => {
        let { data } = res
        console.log(res)
        this.setState({ data })
      },
      error: e => {
        console.log(e)
      }
    })
  }

  _checkFinishedQuiz = () => {
    let quizList = []
    this.state.data.map(item => {
      return (quizList = [...quizList, ...item.list])
    })
    const resultLength = this.answer.length
    if (resultLength < 39) {
      return false
    } else if (resultLength <= 39) {
      const unRequiredIndex = quizList.findIndex(item => {
        return this.answer.findIndex(answer => answer.id === item.id) === -1
      })
      if (quizList[unRequiredIndex].category_id === 1) {
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
    const isFinishedQuiz = this._checkFinishedQuiz()
    if (!isFinishedQuiz) {
      this._showAlert()
      return null
    }
    const currentData = {
      answer: this.answer
    }

    ajaxJsonp({
      url: '/api/Pintu/subQuestion',
      data: {
        token: storage.get('token', localStorage),
        param: JSON.stringify(currentData)
      },
      success: res => {
        console.log(res)
      },
      error: e => {
        console.log(e)
      }
    })
  }
  render() {
    const { data, isShowAlert } = this.state
    if (!data.length) return null
    return (
      <div className="third-page-container">
        <Helmet title="答题页面" link="/quiz" />
        {isShowAlert ? (
          <div className="hidden-view">
            <div className="text-view">请回答完题目再提交哦!</div>
          </div>
        ) : null}
        <div className="bg-image">
          <img src={require('./images/page3_bg.png')} alt="" />
        </div>
        <div className="third-wrapper">
          <div className="title-view">
            <img src={require('./images/page3_top_title.png')} alt="" />
          </div>
          <div className="sub-title-view">
            <img
              src={require('../../containers/swiper_component/component/first_page/images/title.png')}
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
