import React from "react"
import { Switch, Route } from 'react-router'
import Home from "./containers/home/home.jsx"
import Poster from "./containers/poster/poster.jsx"

const routers = () => {
    return (
        <Switch>
            <Route exact path="/" component={Poster} />
            <Route path="/home" component={Home} />
        </Switch>
    )
}

export default routers
