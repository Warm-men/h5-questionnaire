import './index.scss'
import QuizItem from './quiz_item'

export default class ListItem extends React.PureComponent {
  render() {
    const { item, index, updateAnswer } = this.props
    const titleText = index === 0 ? '一、基本情况' : '二、调研问卷'
    return (
      <div className="quiz-view">
        <div className="quiz-view-tilte">{titleText}</div>
        {item.list.map((item, key) => {
          return (
            <QuizItem
              updateAnswer={updateAnswer}
              item={item}
              key={key}
              superIndex={index}
              index={key}
            />
          )
        })}
      </div>
    )
  }
}
