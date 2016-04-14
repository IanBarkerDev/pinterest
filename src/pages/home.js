import React, { Component } from 'react';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Modals from 'components/Modals';
import Main from 'components/Main';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            userLogged: null,
            isModalsVisible: false,
            modalVisible: -1
        }
    }

    loginVisible = () => {
        this.setState({
            isModalsVisible: true,
            modalVisible: 1
        })
    };

    signupVisible = () => {
        this.setState({
            isModalsVisible: true,
            modalVisible: 2
        })
    };

    modalsClose = () => {
        this.setState({
            isModalsVisible: false,
            modalVisible: -1
        })
    };

    handleLogin = (un, pw) => {
        $.ajax({
            url: "/login",
            type: "post",
            dataType: "json",
            data: {
                username: un,
                password: pw
            },

            success: function (val) {
                switch (val.response) {
                    case 1:
                        this.setState({userLogged: un});
                        this.forceUpdate();
                        this.setState({isModalsVisible: false, modalVisible: -1});
                        break;
                    case 2:
                        alert("Password does not match records on file.");
                        break;
                    case 3:
                        alert("Username not found.");
                        break;
                    default:
                        break;
                }
            }.bind(this)
        })
    };

    handleSignup = (un, pw, pw2) => {
        if (pw !== pw2) {
            alert("Passwords do not match up. Check again.")
        } else {
            $.ajax({
                url: "/signup",
                type: "post",
                dataType: "json",
                data: {
                    username: un,
                    password: pw
                },

                success: function (val) {
                    switch (val.response) {
                        case 1:
                            this.setState({userLogged: un});
                            this.setState({isModalsVisible: false, modalVisible: -1});
                            this.forceUpdate();
                            break;
                        case 2:
                            console.log("Username already exists.");
                            break;
                        default:
                            break;
                    }
                }.bind(this)
            })
        }
    };

    handleModalClose = (e) => {
        if (this.state.isModalsVisible) {
            if (e.target === document.getElementsByClassName("modals")[0]) {
                this.setState({isModalsVisible: false, modalVisible: -1})
            }
        }
    };

    handleLogout = () => {
        this.setState({
            userLogged: null
        });
    };

    render() {
        return (
            <div className="app" onClick={this.handleModalClose}>
                <Header handleLoginClick={this.loginVisible} handleSignupClick={this.signupVisible}
                        handleLogoutClick={this.handleLogout} userLogged={this.state.userLogged}/>
                <Main userLogged={this.state.userLogged}/>
                <Footer />
                {this.state.isModalsVisible ?
                    <Modals handleModalsClose={this.modalsClose} handleLogin={this.handleLogin}
                            handleSignup={this.handleSignup}
                            type={(this.state.modalVisible === 1 ? "login" : "signup")}/> : null}
            </div>
        );
    }
}

export default Home;