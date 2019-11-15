import React from "react"
import ReactDOM from "react-dom"
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { Provider } from "react-redux"
import Routes from "./router.js"
import initApp from "./libs/app"
import store from './store'

//init
initApp();

ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Provider store={store}>
            <Routes />
        </Provider>
    </Router>,
    document.getElementById('root')
)