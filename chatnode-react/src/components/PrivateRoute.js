import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'

export default class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isAuthenticated: false
        }
    }
    componentDidMount() {
        this.checkLoggedIn();
    }

    async checkLoggedIn(){
        const data = await require('../static-data.json');
        axios.get(data.api_route + data.secure_url,{'Content-Type':'text/plain',withCredentials:true})
            .then(response => response.data)
            .then(data => {
                if(data.status === 200){
                    this.setState({
                        loading:false,
                        isAuthenticated:true
                    });
                }else{
                    this.setState({
                        loading:false
                    });
                }
            })
            .catch(err => console.log(err));
    }


    render() {
        const { loading, isAuthenticated } = this.state
        const { component: Component, ...rest } = this.props
        return (
            <Route
                {...rest}
                render={
                    props => this.state.isAuthenticated
                        ?
                        (
                            <Component {...props} />
                        )
                        :
                        (
                            this.state.loading
                                ?
                                (
                                    <div>LOADING</div>
                                )
                                :
                                (
                                    <Redirect to={{ pathname: "/", state: { from: this.props.location } }} />
                                )
                        )
                }
            />
        )
    }
}
