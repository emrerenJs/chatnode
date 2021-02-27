import React, { Component } from 'react'
import '../css/login.css';
export default class Login extends Component {
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
                                <a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i>Login with Google+</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}