import React, { Component } from 'react';

import '../css/chat.css';
import socket from 'socket.io-client';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
            onlineUsers: []
        }
    }

    componentDidMount() {
        this.connectSocket();
    }

    async connectSocket() {
        const data = await require('../static-data.json');
        const connectedSocket = socket(data.api_route, { transports: ['websocket'] });
        connectedSocket.on('onlineUserList', users => {
            console.log(users);
            this.setState({
                onlineUsers: users
            });
        })
    }

    renderActiveTab() {
        if (this.state.activeTab === 0) {
            return (
                <div className="tab-left">
                    <ul className="people">
                        <li className="person"><span className="name">Thomas Bangalter</span><span className="preview">I was wondering...</span></li>
                        <li className="person active"><span className="name">Dog Woofson</span><span className="preview">I've forgotten how it felt before</span></li>
                        <li className="person"><span className="name">Louis CK</span><span className="preview">But we’re probably gonna need a new carpet.</span></li>
                        <li className="person"><span className="name">Bo Jackson</span><span className="preview">It’s not that bad...</span></li>
                        <li className="person"><span className="name">Michael Jordan</span><span className="preview">
                            Wasup for the third time like is
you blind bitch</span></li>
                        <li className="person"><span className="name">Drake</span><span className="preview">howdoyoudoaspace</span></li>
                        <li className="person"><span className="name">Louis CK</span><span className="preview">But we’re probably gonna need a new carpet.</span></li>
                        <li className="person"><span className="name">Bo Jackson</span><span className="preview">It’s not that bad...</span></li>
                        <li className="person"><span className="name">Michael Jordan</span><span className="preview">
                            Wasup for the third time like is
you blind bitch</span></li>
                        <li className="person"><span className="name">Drake</span><span className="preview">howdoyoudoaspace</span></li>
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="tab-right">
                    <ul className="people">
                        {this.state.onlineUsers.map((user,index) => (
                            <li key={index} className="person"><span className="name">{user.meta.name +" "+user.meta.surname}</span><span className="preview">I was wondering...</span></li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    changeActiveTab(activeTab) {
        this.setState({
            activeTab
        });
    }

    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="container">
                        <div className="left">
                            <div className="top">
                                <ul className="tab">
                                    <li className="conversations" onClick={this.changeActiveTab.bind(this, 0)}><a className={this.state.activeTab === 0 ? "active " : ""}>Chats</a></li>
                                    <li className="onlineUsers" onClick={this.changeActiveTab.bind(this, 1)}><a className={this.state.activeTab === 1 ? "active" : ""}>Online Users</a></li>
                                </ul>
                            </div>
                            <div className="tabArea">
                                {this.renderActiveTab()}
                            </div>
                            <div className="bottom">
                                <button>New Group</button>
                            </div>
                        </div >
                        <div className="right">
                            <div className="top"><span><span className="name">Dog Woofson</span></span></div>
                            <div className="chat active-chat">
                                <div className="bubble you"><span>Hakan Aydın</span>Hello, can you hear me?</div>
                                <div className="bubble you"><span>Hakan Aydın</span>I'm in California dreaming</div>
                                <div className="bubble me">... about who we used to be.</div>
                                <div className="bubble me">Are you serious?</div>
                                <div className="bubble you"><span>Hakan Aydın</span>When we were younger and free...</div>
                                <div className="bubble you"><span>Hakan Aydın</span>I've forgotten how it felt before</div>
                            </div>
                            <div className="write">
                                <input type="text" /><a href="javascript:;" className="write-link send"></a>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        )
    }
}
