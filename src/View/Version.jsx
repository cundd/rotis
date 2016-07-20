import React from 'react';

export default class extends React.Component {
    render() {
        return <div className="toolbar-item -right">Version <span className="version">{this.props.version}</span></div>
    }
};
