import asyncComponent from './asyncComponent'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import ajaxJsonp from 'src/lib/ajaxJsonp.js'

const Home = asyncComponent(() => import('src/containers/index'))
const WriteOff = asyncComponent(() => import('src/containers/write_off'))
const Introduce = asyncComponent(() => import('src/containers/introduce'))
const Quiz = asyncComponent(() => import('src/containers/quiz'))
const Prize = asyncComponent(() => import('src/containers/prize'))

class Routers extends React.PureComponent {
  componentDidMount() {
    // NOTE：首页获取一下接口，在其他页面防止过期跳转
    ajaxJsonp({
      url: `/api/Question/getWinRecord`,
      data: {
        app_type: global.app_type
      },
      success: res => {
        const { pathname } = window.location
        if (
          res.code === 1 &&
          res.data &&
          res.data.winning_code &&
          !_.includes(pathname, 'write_off')
        ) {
          this.props.history.replace('/prize')
        }
      }
    })
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/index" component={Home} />
        <Route path="/write_off" component={WriteOff} />
        <Route path="/introduce" component={Introduce} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/prize" component={Prize} />
        <Redirect exact strict from="*" to="/" />
      </Switch>
    )
  }
}

export default withRouter(Routers)
