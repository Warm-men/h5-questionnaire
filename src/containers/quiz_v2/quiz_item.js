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
    let updateKey = ''
    let currentKey = ''
    let preStateKey = this.state.currentAnswerKey
    const { updateAnswer, item } = this.props
    if (item.category_id === 3) {
      if (preStateKey.indexOf(answerKey) !== -1) {
        currentKey = preStateKey.split(answerKey).join('')
      } else {
        currentKey = preStateKey + `${answerKey}`
      }
      updateKey = currentKey.split('').join(',')
    } else {
      currentKey = answerKey + ''
      updateKey = answerKey + ''
    }
    this.setState({ currentAnswerKey: currentKey })
    updateAnswer(item.id, updateKey, item.category_id)
  }
  render() {
    const { item, index, superIndex } = this.props
    const { currentAnswerKey } = this.state
    const quizNum =
      superIndex === 0 ? superIndex * 5 + index + 1 : superIndex * 5 + index

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
