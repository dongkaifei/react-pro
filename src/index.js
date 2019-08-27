import React from "react"
import ReactDOM from "react-dom"
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import Routes from "./router.js"
import initApp from "./libs/app"

//init
initApp();

ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Routes />
    </Router>,
    document.getElementById('root')
)