import React, {Component} from 'react';

class SignupModal extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            password2: ""
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

    handlePassword2Change = (e) => {
        this.setState({
            password2: e.target.value
        })
    };

    handleSignup = () => {
        this.props.handleSignup(this.state.username, this.state.password, this.state.password2);
    };

    handleKeyPress = (e) => {
        if (e.key == "Enter") {
            this.handleSignup();
        }
    };

    render () {
        return (
            <div className="modal signup-modal">
                <h4>Sign up</h4>
                <button type="button" className="modal-close" onClick={this.props.handleClose}>X</button>
                <input type="text" className="form-input form-username" placeholder="Username" onChange={this.handleUsernameChange} onKeyPress={this.handleKeyPress} />
                <input type="password" className="form-input form-password" placeholder="Password" onChange={this.handlePasswordChange} onKeyPress={this.handleKeyPress} />
                <input type="password" className="form-input form-password2" placeholder="Confirm Password" onChange={this.handlePassword2Change} onKeyPress={this.handleKeyPress} />
                <button type="button" className="form-input form-submit" onClick={this.handleSignup}>Sign up</button>
            </div>
        )
    }
}

export default SignupModal;