import asyncComponent from './asyncComponent'
import { Route, Switch, withRouter } from 'react-router-dom'

const Home = asyncComponent(() => import('src/containers/swiper_component'))

class Routers extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/index" component={Home} />
      </Switch>
    )
  }
}

export default withRouter(Routers)
