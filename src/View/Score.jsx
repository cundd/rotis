import React from 'react';

export default class extends React.Component {
    render() {
        return <div className="toolbar-item">Score <span className="score">{this.props.score}</span></div>
    }
};
