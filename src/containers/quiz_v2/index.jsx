import { useState, useEffect, useRef } from 'react'
import './index.scss'
import ajaxJsonp from 'src/lib/ajaxJsonp.js'
import * as storage from 'src/lib/storage.js'
import Helmet from 'src/lib/pagehelmet.js'
import ListItem from './quiz_list'
import useShare from 'src/hooks/useShare.js'

export default function ThirdPage(props) {
  const [data, setData] = useState([])
  const [isShowAlert, setIsShowAlert] = useState(false)
  const [isShowFinishedAlert, setIsShowFinishedAlert] = useState(false)
  const [showShareGuid, setShowShareGuid] = useState(false)
  const [loading, setLoading] = useState(false)
  const answer = useRef([])

  useShare()

  useEffect(() => {
    queryQuiz()
  }, [])

  const updateAnswer = (id, key, category_id) => {
    if (!id) return
    const index = answer.current.findIndex(item => item.id === id)

    if (index !== -1) {
      answer.current[index] = { id, user_answer: key, category_id }
    } else {
      answer.current.push({ id, user_answer: key, category_id })
    }
  }

  const queryQuiz = () => {
    let timer = null
    ajaxJsonp({
      url: '/api/Pintu/getQuestion',
      data: { token: storage.get('token', localStorage) },
      method: 'POST',
      success: res => {
        timer && clearTimeout(timer)
        setData(res.data)
      },
      error: e => {
        timer = setTimeout(queryQuiz, 2000)
      }
    })
  }

  const checkFinishedQuiz = () => {
    let quizList = []
    data.map(item => item.list && (quizList = [...quizList, ...item.list]))
    let textQuizCount = 0
    quizList.map(item => item.category_id === 2 && textQuizCount++) //选填题目数目
    const resultLength = answer.current.length
    if (resultLength <= quizList.length - textQuizCount) {
      const ids = answer.current.map(item => item.id)
      const unRequiredQuiz = quizList.filter(item => !ids.includes(item.id))
      const unRequiredQuizIdIndex = unRequiredQuiz.findIndex(
        item => item.category_id === 1 || item.category_id === 3
      )
      if (unRequiredQuizIdIndex !== -1) {
        //未完成单选题
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  }

  const showAlert = () => {
    setIsShowAlert(true)
    setTimeout(hideAlert, 2000)
  }

  const hideAlert = () => setIsShowAlert(false)

  const submitQuiz = () => {
    if (loading) return null
    const isFinishedQuiz = checkFinishedQuiz()
    if (!isFinishedQuiz) {
      showAlert()
      return null
    }
    setLoading(true)

    ajaxJsonp({
      url: '/api/Pintu/subQuestion',
      data: {
        token: storage.get('token', localStorage),
        params: { answer: JSON.stringify(answer.current) }
      },
      success: res => {
        hanldeFinishedSub()
        setLoading(false)
      },
      error: () => setLoading(false)
    })
  }

  const hanldeFinishedSub = () => setIsShowFinishedAlert(true)

  const onClosePage = () => props.history.push('/index')

  const openGuid = () => setShowShareGuid(true)

  if (!data.length) return null
  return (
    <div className="third-page-container">
      <Helmet title="互联网金融消费知识小调研" link="/quiz" />
      {isShowAlert ? (
        <div className="hidden-view">
          <div className="text-view">请回答完题目再提交哦!</div>
        </div>
      ) : null}
      {isShowFinishedAlert ? (
        <div className="finished-view">
          <div className="image-view">
            <div className="close-button" onClick={onClosePage} />
            <img src={require('./images/finished_image.png')} alt="" />
            <div className="open-guid" onClick={openGuid} />
          </div>
          {showShareGuid ? (
            <div className="guid-view">
              <img src={require('./images/share_arrow.png')} alt="" />
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="bg-image">
        <img src={require('./images/page3_bg.png')} alt="" />
      </div>
      <div>
        <div className="title-view">
          <img
            src={require('../swiper_component/component/second_page/images/super_title.png')}
            alt=""
          />
        </div>
        <div className="sub-title-view">
          <img
            src={require('../../containers/swiper_component/component/second_page/images/title.png')}
            alt=""
          />
        </div>
      </div>
      {data.map((item, index) => {
        return (
          <ListItem
            item={item}
            updateAnswer={updateAnswer}
            key={index}
            index={index}
          />
        )
      })}
      <div className="submit-button-view">
        <div className="button-view" onClick={submitQuiz}>
          <img src={require('./images/submit_button.jpg')} alt="" />
        </div>
      </div>
    </div>
  )
}
