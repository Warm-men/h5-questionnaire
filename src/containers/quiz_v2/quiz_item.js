import './index.scss'
import AnswerItem from './answer_item'
import FormText from './form_text'

export default class QuizItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      key: null
    }
  }
  _updateAnswer = key => {
    this.setState({ key })
    const { updateAnswer, item } = this.props
    updateAnswer(item.id, key)
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
        {item.category_id === 1 ? (
          <div className="answer-view">
            {item.select_set.map((answerItem, index) => {
              return (
                <AnswerItem
                  item={answerItem}
                  key={index}
                  updateAnswer={this._updateAnswer}
                  onFocus={this.state.key === answerItem.key}
                />
              )
            })}
          </div>
        ) : (
          <FormText item={item} updateAnswer={this._updateAnswer} />
        )}
      </div>
    )
  }
}
