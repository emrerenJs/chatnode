import React, { Component } from 'react';

import '../css/chat.css';
import socket from 'socket.io-client';
import { Redirect } from "react-router-dom";

export default class Chat extends Component {
    /* ON COMPONENT LOAD */
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
            onlineUsers: [],
            activeSocket: null,
            activeRoom: null,
            rooms: [],
            chatClicked: false,
            messageValue: "",
            redirection: false
        }
    }

    componentDidMount() {
        this.connectSocket();
    }

    async connectSocket() {
        const data = await require('../static-data.json');
        this.setState({
            activeSocket: socket(data.api_route, { transports: ['websocket'] })
        })
        this.state.activeSocket.on('onlineUserList', users => {
            this.setState({
                onlineUsers: users
            });
        })
        this.state.activeSocket.on('roomList', rooms => {
            this.setState({
                rooms
            })
        })
        this.state.activeSocket.on('error', () => {
            console.log("something goes wrong!");
        })

        this.state.activeSocket.on('disconnect', () => {
            console.log("You are disconnected from server!");
            this.setState({
                activeSocket: null,
                redirection: true
            });

        })
    }
    /* ON COMPONENT LOAD */

    /*HELPER FUNCTIONS */

    newRoom() {
        const randomName = Math.random().toString(36).substring(7);
        this.state.activeSocket.emit('newRoom', randomName);
    }

    switchRoom(room) {
        this.setState({
            chatClicked: true,
            activeRoom: room
        })
    }

    sendMessage(event) {
        this.state.activeSocket.emit('newMessage', { message: this.state.messageValue, room: this.state.activeRoom });
        this.setState({
            messageValue: ""
        });
        event.preventDefault();

    }

    changeActiveTab(activeTab) {
        this.setState({
            activeTab
        });
    }

    /* HELPER FUNCTIONS */
    /* HANDLERS */
    handleMessageChange(event) {
        this.setState({
            messageValue: event.target.value
        })
    }
    /* HANDLERS */
    /* DOM */

    renderActiveTab() {
        if (this.state.activeTab === 0) {
            return (
                <div className="tab-left">
                    <ul className="people">
                        {this.state.rooms.map((room, index) => (
                            <li onClick={this.switchRoom.bind(this, room)} key={index} className="person"><span className="name">{room.roomName}</span></li>
                        ))}
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="tab-right">
                    <ul className="people">
                        {this.state.onlineUsers.map((user, index) => (
                            <li key={index} className="person"><span className="name">{user.meta.name + " " + user.meta.surname}</span><span className="preview">I was wondering...</span></li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    /* DOM */

    render() {
        return (
            this.state.redirection ? (<Redirect to="/" />) :
                (
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
                                        <button onClick={this.newRoom.bind(this)}>New Group</button>
                                    </div>
                                </div >
                                <div className="right">
                                    {
                                        this.state.chatClicked
                                        &&
                                        (
                                            <div>
                                                <div className="top"><span><span className="name">{this.state.activeRoom.roomName}</span></span></div>
                                                <div className="chat active-chat">
                                                    <div className="bubble you"><span>Hakan Aydın</span>Hello, can you hear me?</div>
                                                    <div className="bubble you"><span>Hakan Aydın</span>I'm in California dreaming</div>
                                                    <div className="bubble me">... about who we used to be.</div>
                                                    <div className="bubble me">Are you serious?</div>
                                                    <div className="bubble you"><span>Hakan Aydın</span>When we were younger and free...</div>
                                                    <div className="bubble you"><span>Hakan Aydın</span>I've forgotten how it felt before</div>
                                                </div>
                                                <div className="write" onSubmit={this.sendMessage.bind(this)}>
                                                    <form>
                                                        <input value={this.state.messageValue} onChange={this.handleMessageChange.bind(this)} type="text" /><a onClick={this.sendMessage.bind(this)} className="write-link send"></a>
                                                    </form>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div >
                        </div >
                    </div >
                )
        )
    }
}
