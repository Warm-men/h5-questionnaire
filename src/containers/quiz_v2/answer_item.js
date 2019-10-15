import './index.scss'

export default class AnswerItem extends React.PureComponent {
  render() {
    const { item, updateAnswer, onFocus } = this.props
    return (
      <div
        className="answer-item"
        onClick={() => {
          updateAnswer(item.key)
        }}
      >
        {onFocus ? (
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
  }
}
