import './index.scss'
import AnswerItem from './answer_item'
import FormText from './form_text'

export default class QuizItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentAnswerKey: ''
    }
  }
  _updateAnswer = answerKey => {
    let currentKey = ''
    let preKey = this.state.currentAnswerKey
    const { updateAnswer, item } = this.props
    if (item.category_id === 3) {
      if (preKey.indexOf(answerKey) !== -1) {
        currentKey = preKey
          .split(answerKey)
          .join('')
          .split('')
          .join(',')
        console.log(currentKey)
      } else {
        currentKey = preKey + `${answerKey}`
      }
    } else {
      currentKey = answerKey + ''
    }
    this.setState({ currentAnswerKey: currentKey })
    updateAnswer(item.id, currentKey)
  }
  render() {
    const { item, index, superIndex } = this.props
    const { currentAnswerKey } = this.state
    const quizNum =
      superIndex === 0 ? superIndex * 6 + index + 1 : superIndex * 6 + index

    const selectSet = item.category_id !== 2 ? JSON.parse(item.select_set) : []

    return (
      <div className="quesction-item">
        <div className="des-view">
          {`${quizNum}、`}
          {item.description}
        </div>
        {item.category_id === 2 ? (
          <FormText item={item} updateAnswer={this._updateAnswer} />
        ) : (
          <div className="answer-view">
            {selectSet.map((answerItem, index) => {
              const onFocus =
                currentAnswerKey &&
                currentAnswerKey.indexOf(answerItem.key) !== -1
              return (
                <AnswerItem
                  item={answerItem}
                  key={index}
                  updateAnswer={this._updateAnswer}
                  onFocus={onFocus}
                />
              )
            })}
          </div>
        )}
      </div>
    )
  }
}
