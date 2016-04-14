import React, {Component} from 'react';

class Pin extends Component {
    handleUserChange = () => {
        this.props.handleUserChange(this.props.pin.author);
    };

    render () {
        return (
            <div className="pin">
                <a href={this.props.pin.src} target="_blank"><img src={this.props.pin.src + ".png"}
                                                                  alt={this.props.pin.alt} className="pin-img"/></a>

                <p className="pin-title">{this.props.pin.title}</p>
                <button type="button" className="pin-author"
                        onClick={this.handleUserChange}>{this.props.pin.author}</button>
            </div>
        )
    }
}

export default Pin;