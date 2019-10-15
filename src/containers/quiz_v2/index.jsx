import './index.scss'
import ajaxJsonp from 'src/lib/ajaxJsonp.js'
import * as storage from 'src/lib/storage.js'
import Helmet from 'src/lib/pagehelmet.js'

class ThirdPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
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
        let { data } = res
        console.log(res)
        this.setState({ data })
        // if (code === 1 && data) {
        //   _.map(data, (v, k) => {
        //     data[k].select_set = JSON.parse(v.select_set)
        //   })
        //   this.setState({
        //     array: data
        //   })
        // }
      },
      error: e => {
        // e.getAllResponseHeaders()
        console.log(e)
      }
    })
  }
  render() {
    const { data } = this.state
    if (!data.length) return null
    return (
      <div className="third-page-container">
        <Helmet title="答题页面" link="/quiz" />
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
          return <ListItem item={item} key={index} index={index} />
        })}
      </div>
    )
  }
}

class ListItem extends React.PureComponent {
  render() {
    const { item, index } = this.props
    const titleText = index === 0 ? '一、基本情况' : '二、调研问卷'
    return (
      <div className="quiz-view">
        <div className="quiz-view-tilte">{titleText}</div>
        {item.list.map((item, key) => {
          return (
            <QuizItem item={item} key={key} superIndex={index} index={key} />
          )
        })}
      </div>
    )
  }
}

class QuizItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      key: null
    }
  }
  _onSelecedItem = key => {
    this.setState({
      key
    })
  }
  render() {
    const { item, index, superIndex } = this.props
    const quizNum =
      superIndex === 0 ? superIndex * 6 + index + 1 : superIndex * 6 + index
    return (
      <div className="quesction-item">
        <div className="des-view">
          {`${quizNum}、`}
          {item.description}
        </div>
        <div className="answer-view">
          {item.select_set.map((item, index) => {
            return (
              <div
                className="answer-item"
                key={index}
                onClick={() => {
                  this._onSelecedItem(item.key)
                }}
              >
                {this.state.key === item.key ? (
                  <img
                    className="blur-icon"
                    src={require('./images/page3_selected_icon.png')}
                    alt=""
                  />
                ) : (
                  <img
                    className="blur-icon"
                    src={require('./images/page3_blur_icon.png')}
                    alt=""
                  />
                )}
                <div className="answer-text">{item.value}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default ThirdPage
