import { useMemo } from 'react'
import './index.scss'

export default function ThirdPage(props) {
  const { currentPageIndex } = props
  const pageStyle = useMemo(() => {
    if (currentPageIndex === 1) {
      return {
        titleStyle: 'jackInTheBox title-image',
        bottomButtonStyle: 'bottom-button-image slideInDown',
        dataListStyle: 'jello data-list-image',
        menStyle: 'men-image shake',
        mouseStyle: 'mouse-image fadeIn',
        womenStyle: 'women-image slideInLeft'
      }
    } else {
      return {
        titleStyle: 'title-image',
        bottomButtonStyle: 'bottom-button-image',
        dataListStyle: 'data-list-image',
        menStyle: 'men-image',
        mouseStyle: 'mouse-image',
        womenStyle: 'women-image'
      }
    }
  }, [currentPageIndex])
  const goQuizPage = () => props.history.push('/quiz')
  return (
    <div className="third-page-container">
      <img
        src={require('./images/commen_bg.jpg')}
        alt=""
        className="bg-image"
      />
      <div className="super-title-image">
        <img src={require('../second_page/images/super_title.png')} alt="" />
      </div>
      <div className={pageStyle.titleStyle}>
        <img src={require('./images/page_3_title.png')} alt="" />
      </div>
      <div className={pageStyle.dataListStyle}>
        <img src={require('./images/page2_data_list.png')} alt="" />
      </div>
      <div className={pageStyle.menStyle}>
        <img src={require('./images/page2_men.png')} alt="" />
      </div>
      <div className={pageStyle.womenStyle}>
        <img src={require('./images/page2_women.png')} alt="" />
      </div>
      <div className="fade-image">
        <img src={require('./images/page2_fade_img_icon.png')} alt="" />
      </div>
      <div className={pageStyle.bottomButtonStyle} onClick={goQuizPage}>
        <img src={require('./images/page2_bottom_button.png')} alt="" />
      </div>
      <div className="introduction_text">
        为积极响应中国人民银行、中国银保监会、中国证监会、国家网信办共同启动的2019年“金融知识普及月
        金融知识进万家 争做理性投资者
        争做金融好网民”活动，进一步了解消费者金融知识的薄弱环节和金融需求，引导金融消费者理性消费，加强金融知识宣传教育的针对性，中国互联网金融协会金融消费权益保护与教育培训专业委员会制作本调查问卷，请您协助填写。我们承诺，本问卷仅用于研究目的，会严格对您提供和描述的信息保密，不会对外泄露您的个人信息，不会对接受问卷调查的个人进行个体分析。感谢您的支持与配合！
      </div>
    </div>
  )
}
