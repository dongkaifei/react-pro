import React from "react"
import ReactDOM from "react-dom"
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import Routes from "./router.js"

ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Routes />
    </Router>,
    document.getElementById('root')
)