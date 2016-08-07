import React from 'react';

export default class extends React.Component {
    render() {
        return <div className="toolbar-item -right version">v{this.props.version}</div>
    }
};
