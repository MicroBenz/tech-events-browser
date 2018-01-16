import React from 'react'
import {Provider} from 'react-redux'
import {Router, Route, Switch} from 'react-static'
import {lifecycle} from 'recompose'
import {injectGlobal} from 'emotion'

import Landing from '../routes'
import Event from '../routes/event'
import NotFound from '../routes/404'

import createStore from '../ducks'

const store = createStore()

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/event/:id" component={Event} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>
)

const enhance = lifecycle({
  componentWillMount() {
    injectGlobal`
      body {
        margin: 0;
        font-weight: 300;
        font-family: Roboto, "Helvetica Neue", "Sukhumvit Set", Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", sans-serif;
        background: #fbfcff;
      }

      * {
        box-sizing: border-box;
      }
    `
  },
})

export default enhance(App)
