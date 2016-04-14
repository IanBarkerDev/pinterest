import React, {Component} from 'react';

class LoginModal extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        }
    }

    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    };

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    };

    handleLogin = () => {
        this.props.handleLogin(this.state.username, this.state.password);
    };

    handleKeyPress = (e) => {
        if (e.key == "Enter") {
            this.handleLogin();
        }
    };

    render () {
        return (
            <div className="modal login-modal">
                <h4>Log in</h4>
                <button type="button" className="modal-close" onClick={this.props.handleClose}>X</button>
                <input type="text" className="form-input form-username" placeholder="Username" onChange={this.handleUsernameChange} onKeyPress={this.handleKeyPress} />
                <input type="password" className="form-input form-password" placeholder="Password" onChange={this.handlePasswordChange} onKeyPress={this.handleKeyPress} />
                <button type="button" className="form-input form-submit" onClick={this.handleLogin}>Log in</button>
            </div>
        )
    }
}

export default LoginModal;