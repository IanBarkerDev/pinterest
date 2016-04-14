import React, {Component} from 'react';

import Pin from 'components/Pin';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            pins: [],
            activePage: "",
            newPinMenu: false,
            newTitle: "",
            newLink: ""
        }
    }

    componentDidMount = () => {
        this.setState({
            activePage: this.props.userLogged,
            pins: this.getPins(this.state.activePage)
        });
    };

    getPins = (un) => {
        $.ajax({
            url: un ? "/user/" + un : "/recent",
            type: "get",

            success: function (val) {
                this.setState({
                    pins: val
                });
            }.bind(this)
        });
    };

    changeUserPage = (un) => {
        new Promise(function () {
            this.getPins(un);
        }.bind(this)).then(this.setState({
                activePage: un
            })).then(this.forceUpdate());
    };

    onChangeTitle = (e) => {
        this.setState({
            newTitle: e.target.value
        })
    };

    onChangeLink = (e) => {
        this.setState({
            newLink: e.target.value
        })
    };

    onClickNewPin = () => {
        var un = this.props.userLogged;
        $.ajax({
            url: "/user/" + un + "/new",
            type: "post",
            dataType: "json",
            data: {
                title: this.state.newTitle,
                src: this.state.newLink
            },

            success: function (v) {
                switch (v.response) {
                    case 1:
                        this.goUser(this.props.userLogged);
                        this.setState({newPinMenu: false});
                        break;
                    case 2:
                        alert("You've already pinned this before.");
                        break;
                    default:
                        break;
                }
            }.bind(this)
        });
    };

    goUser = () => {
        this.changeUserPage(this.props.userLogged);
    };

    goHome = () => {
        this.changeUserPage();
    };

    openNewPinMenu = () => {
        if (this.state.newPinMenu === false) {
            this.setState({
                newPinMenu: true
            })
        } else {
            this.setState({
                newPinMenu: false
            })
        }
    };

    render () {
        return (
            <div className="main">
                {this.props.userLogged ?
                    <div className="user-bar">
                        <button className="bar-button" id="home" type="button" onClick={this.goHome}><i className="fa fa-home"></i></button>
                        <button className="bar-button" id="profile" type="button" onClick={this.goUser}><i className="fa fa-user"></i></button>
                        <button className="bar-button" id="new-pin" type="button" onClick={this.openNewPinMenu}><i className="fa fa-plus"></i></button>
                    </div>
                    : <div className="user-bar">
                    <button className="bar-button" id="home" type="button" onClick={this.goHome}><i className="fa fa-home"></i></button>
                </div>}
                {this.state.newPinMenu && this.props.userLogged ?
                    <div className="new-pin">
                        <input type="text" className="form-input" placeholder="Title" onChange={this.onChangeTitle} />
                        <input type="text" className="form-input" placeholder="Link" onChange={this.onChangeLink} />
                        <button type="button" className="form-submit" onClick={this.onClickNewPin}>New Pin</button>
                    </div>
                    : null }
                <h2>{this.state.activePage ? this.state.activePage + "'s Pins" : "Recent Pins"}</h2>
                <div className="pin-collection">
                    {this.state.pins ?
                        this.state.pins.map(function(val, index) {
                            return (
                                <Pin key={index} pin={val} handleUserChange={this.changeUserPage} />
                            )
                        }, this) : null}
                </div>
            </div>
        )
    }
}

export default Main;