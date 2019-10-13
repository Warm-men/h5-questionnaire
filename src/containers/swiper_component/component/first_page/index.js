import './index.scss'

class FirstPage extends React.Component {
  render() {
    return (
      <div className="first-page-container">
        <img
          src={require('./images/page1_bg.png')}
          alt=""
          className="bg-image"
        />
        <div className="title-image">
          <img src={require('./images/title.png')} alt="" />
        </div>

        {/* <img
          src={require('./images/page1_cion.png')}
          alt=""
          className="page1-cion-image"
        />
        <img
          src={require('./images/page1_loop_book.png')}
          alt=""
          className="page1-rocket-image"
        />
        <img
          src={require('./images/page1_rocket.png')}
          alt=""
          className="page1-rocket-image"
        />
        <img
          src={require('./images/plant.png')}
          alt=""
          className="plant-image"
        /> */}
      </div>
    )
  }
}

export default FirstPage
