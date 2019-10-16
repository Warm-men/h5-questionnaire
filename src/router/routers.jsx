import { lazy, Suspense } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

const Home = lazy(() => import('src/containers/swiper_component'))
const Quiz = lazy(() => import('src/containers/quiz_v2'))

function Routers(props) {
  return (
    <Switch>
      <Suspense fallback={<div>Loding...</div>}>
        <Route exact path="/" component={Home} />
        <Route exact path="/index" component={Home} />
        <Route exact path="/quiz" component={Quiz} />
      </Suspense>
    </Switch>
  )
}

export default withRouter(Routers)
