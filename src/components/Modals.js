import React, {Component} from 'react';

import LoginModal from 'components/LoginModal';
import SignupModal from 'components/SignupModal';

class Modals extends Component {
    render () {
        return (
            <div className="modals">
                {this.props.type === "login" ? <LoginModal handleClose={this.props.handleModalsClose} handleLogin={this.props.handleLogin} /> : <SignupModal handleClose={this.props.handleModalsClose} handleSignup={this.props.handleSignup} />}
            </div>
        )
    }
}

export default Modals;