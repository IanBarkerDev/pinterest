import React, {Component} from 'react';

import HeaderLink from 'components/HeaderLink';

class Header extends Component {
    render () {
        return (
            <div className="header">
                <h1>Pinterest <span className="subtitle"> The internet, collected.</span></h1>
                <ul>
                    {!this.props.userLogged ? <li className="float-right"><HeaderLink type={"log in"} handleClick={this.props.handleLoginClick} /></li> : null}
                    {!this.props.userLogged ? <li className="float-right"><HeaderLink type={"sign up"} handleClick={this.props.handleSignupClick} /></li> : null}
                    {this.props.userLogged ? <li className="float-right"><HeaderLink type={"log out"} handleClick={this.props.handleLogoutClick} /></li> : null}
                </ul>
            </div>
        )
    }
}

export default Header;