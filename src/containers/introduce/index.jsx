import Helmet from 'src/lib/pagehelmet.js'
import 'src/containers/introduce/index.scss'

class IntroduceContainer extends React.Component {
  next = () => {
    this.props.history.push('/quiz')
  }

  render() {
    return (
      <div className="introduce-container">
        <Helmet title="活动简介" link="/introduce" />
        <img
          src={require('./images/introduce_bg.jpg')}
          alt=""
          className="banner-image"
        />
        <img
          src={require('./images/introduce_btn.png')}
          alt=""
          className="btn-image"
          onClick={this.next}
        />
      </div>
    )
  }
}

export default IntroduceContainer
