import React from 'react';

export default class extends React.Component {
    render() {
        return <a href="#" className="toolbar-item" onClick={this.props.onClick}>Reload</a>
    }
};
