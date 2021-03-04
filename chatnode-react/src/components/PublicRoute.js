import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

export default class PublicRoute extends Component {

    render() {
        const {component:Component, ...rest} = this.props
        return (
            <Route
                {...rest}
                render = {
                    props => <Component {...props} />
                }
            />
        )
    }
}
