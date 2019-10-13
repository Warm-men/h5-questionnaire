import './index.scss'

class SecondPage extends React.Component {
  render() {
    return (
      <div className="first-page-container">
        <img
          src={require('../first_page/images/page1_bg.png')}
          alt=""
          className="bg-image"
        />
      </div>
    )
  }
}

export default SecondPage
