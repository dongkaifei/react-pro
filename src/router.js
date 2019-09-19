import React, { Suspense, lazy } from "react"
import { Switch, Route } from 'react-router'

const Poster = lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(import(/* webpackChunkName: "poster" */ "./containers/poster/poster.jsx"))
        }, 3000)
    })
});
const Home = lazy(() => import(/* webpackChunkName: "home" */  "./containers/home/home.jsx"));

const routers = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route exact path="/" component={Poster} />
                <Route path="/home" component={Home} />
            </Switch>
        </Suspense>
    )
}

export default routers
