import Helmet from 'src/lib/pagehelmet.js'
import ajaxJsonp from 'src/lib/ajaxJsonp.js'
import * as storage from 'src/lib/storage.js'
import 'src/containers/quiz/index.scss'
class QuizContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      array: [],
      answers: {},
      isDone: false,
      showErrorAlert: false,
      errorMessage: null
    }
    this.loading = false
    this.alertTime = 3000
    this.timer = null
  }

  componentDidMount() {
    ajaxJsonp({
      url: '/api/Question/getQuestion',
      data: {
        app_type: global.app_type
      },
      success: res => {
        let { data, code } = res
        if (code === 1 && data) {
          _.map(data, (v, k) => {
            data[k].select_set = JSON.parse(v.select_set)
          })
          this.setState({
            array: data
          })
        }
      },
      error: e => {
        console.log(e)
      }
    })
  }

  select = (answer, quetion) => {
    const { id } = quetion
    const { answers } = this.state
    answers[id] = answer
    this.setState({ answers })
  }

  postAnswer = () => {
    const { answers, array } = this.state
    if (this.loading) {
      return null
    }
    this.loading = true
    let answer = []
    for (let i in answers) {
      answer.push({
        id: i,
        choose_key: answers[i]
      })
    }
    if (answer.length < array.length) {
      this.loading = false
      this.setErrorAlert('请填完所有题目')
      return null
    }
    this.setState(
      {
        isDone: true
      },
      () => {
        this.scroll.scrollTop = 0
      }
    )
    ajaxJsonp({
      url: '/api/Question/subQuestion',
      data: {
        answer,
        app_type: global.app_type
      },
      success: res => {
        this.loading = false
        const { data, code } = res
        if (code === 1 && data) {
          storage.set('recordId', data.record_id)
          this.setState({
            isDone: true
          })
        }
      },
      error: e => {
        this.loading = false
      }
    })
  }

  setErrorAlert = msg => {
    this.setState(
      {
        showErrorAlert: true,
        errorMessage: msg,
        isLoading: false
      },
      () => {
        this.timer = setTimeout(() => {
          this.resetErrorAlert()
        }, this.alertTime)
      }
    )
  }

  resetErrorAlert = () => {
    this.setState(
      {
        showErrorAlert: false,
        errorMessage: null
      },
      () => {
        this.timer = null
      }
    )
  }

  pushToPrize = () => {
    this.props.history.push('/prize') //FIXME write router name
  }

  render() {
    const { answers, showErrorAlert, errorMessage, isDone } = this.state
    const bgImageUrl = isDone
      ? require('./images/result_bg.jpg')
      : require('./images/quiz_bg.jpg')
    const buttonImageUrl = isDone
      ? require('./images/result_btn.png')
      : require('./images/quiz_btn.png')
    const handleOnClick = isDone ? this.pushToPrize : this.postAnswer
    return (
      <div className="quiz-container">
        <Helmet title="答题页面" link="index" />
        {showErrorAlert && errorMessage && (
          <div className="error-message-view">
            <div className="error-message-text">{errorMessage}</div>
          </div>
        )}
        <img src={bgImageUrl} alt="" className="quiz-image" />
        <div className="quiz-scroll" ref={refs => (this.scroll = refs)}>
          {_.map(this.state.array, (quetion_v, k) => {
            return (
              <div key={k}>
                <p className="quiz-description" key={k}>
                  {k + 1 + '. '}
                  {quetion_v.description}
                </p>
                {_.map(quetion_v.select_set, (answer_v, answer_k) => {
                  const { id } = quetion_v
                  const isSelected =
                    answers[id] && answers[id].key === answer_v.key
                  const select = isDone ? null : this.select
                  return (
                    <AnswerItem
                      quetion={quetion_v}
                      isSelected={isSelected}
                      answer={answer_v}
                      onClick={select}
                      key={answer_k}
                    />
                  )
                })}
                {isDone && (
                  <p className="quiz-description" key={k + quetion_v.id}>
                    {'答题解析：'}
                    {quetion_v.explanation}
                  </p>
                )}
              </div>
            )
          })}
        </div>
        <img
          src={buttonImageUrl}
          alt=""
          className="btn-image"
          onClick={handleOnClick}
        />
      </div>
    )
  }
}

class AnswerItem extends React.PureComponent {
  onClick = () => {
    const { answer, onClick, quetion } = this.props
    onClick && onClick(answer, quetion)
  }
  render() {
    const { answer, isSelected } = this.props
    const itemStyle = isSelected ? 'answer-button-focus' : 'answer-button-blur'
    return (
      <span className={itemStyle} onClick={this.onClick}>
        {answer.key}
        {'. '}
        {answer.value}
      </span>
    )
  }
}

export default QuizContainer
