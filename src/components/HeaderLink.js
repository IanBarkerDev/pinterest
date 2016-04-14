import React, {Component} from 'react';

class HeaderLink extends Component {
    capitalize = (s) => {
        var a = s.split("");
        a[0] = a[0].toUpperCase();
        return a.join("");
    };

    render() {
        return (
            <button type="button" className="link" id={this.props.type.replace(" ", "")}
                    onClick={this.props.handleClick}>
                {this.capitalize(this.props.type)}
            </button>
        )
    }
}

export default HeaderLink