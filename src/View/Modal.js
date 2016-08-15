import React from 'react';

export default class Modal extends React.Component {
    onClick(event) {
        this.props.onClick(event);
    }

    render() {
        let content = [];
        const _onClick = this.onClick.bind(this);

        if (this.props.heading) {
            content.push(<div key="heading" className="modal-heading"><h1>{this.props.heading}</h1></div>);
        }

        if (this.props.messageBody) {
            content.push(<div key="body" className="modal-body">{this.props.messageBody}</div>);
        } else if (this.props.message) {
            content.push(<div key="body" className="modal-body">{this.props.message}</div>);
        } else if(this.props.children) {
            content.push(<div key="body" className="modal-body">{this.props.children}</div>);
        }

        return <div className="modal-overlay" onClick={_onClick}>
            <div className="modal">
                {content}
            </div>
        </div>
    }
};
