import './index.scss'

export default class FormText extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  _onChange = event => {
    const value = event.currentTarget.value
    this.setState({ value })
    this.props.updateAnswer(value)
  }
  render() {
    const { value } = this.state
    return (
      <div className="answer-item">
        <textarea
          className="text-view"
          onChange={this._onChange}
          value={value}
          placeholder={'选填'}
        />
      </div>
    )
  }
}
