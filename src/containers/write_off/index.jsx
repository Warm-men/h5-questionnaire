import React, { Component } from 'react'
import 'src/containers/write_off/index.scss'
import Helmet from 'src/lib/pagehelmet.js'
import ajaxJsonp from 'src/lib/ajaxJsonp.js'

export default class WriteOff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      winningCode: '',
      isLoading: false,
      isCompleted: false,
      passWord: '',
      errorMessage: null,
      showErrorAlert: false,
      isChange: false
    }
    this.alertTime = 3000
  }

  confirm = () => {
    if (this.state.isLoading) {
      return null
    }
    this.setState({ isLoading: true }, this.handleSubmit)
  }

  handleSubmit = () => {
    const { passWord, winningCode } = this.state
    const data = {
      pass_word: passWord + '',
      winning_code: winningCode + ''
    }
    this.setErrorAlert()
    ajaxJsonp({
      url: `/api/Question/convert`,
      data,
      success: res => {
        const { code, msg } = res
        if (code === 0) {
          this.setErrorAlert(msg)
        } else if (code === 1) {
          this.setState({
            isCompleted: true
          })
        }
      },
      error: res => {
        const { msg } = res
        this.setErrorAlert(msg)
      }
    })
  }

  handleWinningCodeChange = e => {
    if (e.target.value.length > 12) {
      return null
    }
    this.setState(
      {
        winningCode: e.target.value
      },
      this.isFinishedInput
    )
  }

  setErrorAlert = msg => {
    this.setState(
      {
        showErrorAlert: true,
        errorMessage: msg,
        isLoading: false
      },
      () => {
        this.timer = setTimeout(() => {
          this.resetErrorAlert()
        }, this.alertTime)
      }
    )
  }

  resetErrorAlert = () => {
    this.setState(
      {
        showErrorAlert: false,
        errorMessage: null
      },
      () => {
        this.timer = null
      }
    )
  }

  handleChangePassWord = e => {
    if (e.target.value.length > 6) {
      return null
    }
    this.setState(
      {
        passWord: e.target.value
      },
      this.isFinishedInput
    )
  }

  isFinishedInput = () => {
    const { passWord, winningCode } = this.state
    this.setState({
      isChange: passWord && winningCode
    })
  }

  resetStateOfPage = () => {
    this.setState({
      winningCode: '',
      isLoading: false,
      isCompleted: false,
      passWord: '',
      isChange: false
    })
  }

  render() {
    const {
      isChange,
      isCompleted,
      showErrorAlert,
      errorMessage,
      winningCode,
      passWord,
      isLoading
    } = this.state
    const buttonViewStyle = isChange
      ? 'buttonView'
      : 'buttonView buttonViewBlue'
    return isCompleted ? (
      <div className="complete-view">
        <Helmet title="兑换奖品" link="write_off" />
        <div className="complete-text">兑换成功！</div>
        <div className="continute-btn" onClick={this.resetStateOfPage}>
          继续兑换
        </div>
      </div>
    ) : (
      <div className="write-off-view">
        <Helmet title="兑换奖品" link="write_off" />
        {showErrorAlert && errorMessage && (
          <div className="error-message-view">
            <div className="error-message-text">{errorMessage}</div>
          </div>
        )}
        <div className="label">
          奖品兑换码
          <input
            type="number"
            onChange={this.handleWinningCodeChange}
            value={winningCode}
            placeholder="请输入"
            className="input-view"
          />
        </div>
        <div className="label">
          管理员账号
          <input
            type="number"
            onChange={this.handleChangePassWord}
            value={passWord}
            placeholder="请输入"
            className="input-view"
          />
        </div>
        <div
          onClick={isChange ? this.confirm : null}
          className={buttonViewStyle}
        >
          <div className={'buttonText'}>{isLoading ? `提交中...` : `提交`}</div>
        </div>
      </div>
    )
  }
}
