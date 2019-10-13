import Helmet from 'src/lib/pagehelmet.js'
import wxInit from 'src/lib/wx_config.js'
import Swiper from 'react-id-swiper'
import './index.scss'
import 'swiper/css/swiper.min.css'
import 'react-id-swiper/lib/styles/css/swiper.css'

class IndexContainer extends React.Component {
  constructor(props) {
    super()
    this.options = {
      direction: 'vertical'
    }
  }

  componentDidMount() {}

  next = () => {
    this.props.history.push('/introduce')
  }

  render() {
    return (
      <div className="home-container">
        <Helmet title="首页" link="index" />
        <Swiper
          slideClass="custom-swiper-slide"
          wrapperClass="custom-swiper-wrapper"
          {...this.options}
        >
          <div className="swiper-image">
            <img
              src={require('./images/home_bg.jpg')}
              alt=""
              className="btn-image"
            />
          </div>
          <div className="swiper-image">2</div>
          <div className="swiper-image">3</div>
        </Swiper>
      </div>
    )
  }
}

export default IndexContainer
