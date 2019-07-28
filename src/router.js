import React from "react"
import { Switch, Route } from 'react-router'
import Home from "./containers/home/home.jsx"
import Abc from "./containers/abc/abc.jsx"

const routers = () => {
    return (
        <Switch>
            <Route path="/abc" component={Abc} />
            <Route path="/home" component={Home} />
        </Switch>
    )
}

export default routers
