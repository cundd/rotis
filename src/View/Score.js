import React from 'react';

export default class extends React.Component {
    render() {
        return <div className="toolbar-item">Score{" "}
            <span className="score">{this.props.score}</span>{" "}
            <span className="high-score">(high {this.props.highScore})</span>
        </div>
    }
};
