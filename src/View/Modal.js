import React from 'react';

export default class extends React.Component {
    render() {
        let message = this.props.message;
        if (this.props.message) {

        }
        return <div className="modal-overlay">
            <div className="modal" onClick={this.props.onClick}>
                <div className="modal-body">{this.props.message}</div>
            </div>
        </div>
    }
};
