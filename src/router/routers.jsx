import asyncComponent from './asyncComponent'
import { Route, Switch, withRouter } from 'react-router-dom'

const Home = asyncComponent(() => import('src/containers/swiper_component'))
const Quiz = asyncComponent(() => import('src/containers/quiz_v2'))

function Routers(props) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/index" component={Home} />
      <Route exact path="/quiz" component={Quiz} />
    </Switch>
  )
}

export default withRouter(Routers)
