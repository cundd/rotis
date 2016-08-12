import React from 'react';

export default class Reload extends React.Component {
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return <a href="#" className="toolbar-item" onClick={this.props.onClick}>Reload</a>
    }
};
