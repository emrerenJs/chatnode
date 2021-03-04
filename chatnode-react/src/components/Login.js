import React, { Component } from 'react';

import '../css/login.css';

export default class Login extends Component {
    state = {
        data: {}
    }
    componentDidMount() {
        this.getStaticData();
    }

    async getStaticData() {
        const data = await require('../static-data.json');
        this.setState({
            data
        });
    }

    render() {
        return (
            <div>
                <div>
                    <div className="modal">
                        <div className="modal__inner">
                            <div className="modal__header">
                                <h2>Welcome, please login.</h2>
                            </div>
                            <div className="modal__footer">
                                <a href={this.state.data.api_route + "/security/google"}><i className="fa fa-google-plus" aria-hidden="true"></i> Login with Google+ </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}