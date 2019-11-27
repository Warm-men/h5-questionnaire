import { Router } from 'react-router-dom'
import * as history from 'history'
import Routers from './routers'
import useLogin from 'src/hooks/useLogin'

export default function App() {
  const [isLogin] = useLogin()
  if (isLogin) {
    return (
      <Router history={history.createBrowserHistory()}>
        <Routers />
      </Router>
    )
  } else {
    return null
  }
}
