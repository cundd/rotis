import React from 'react';

export default class extends React.Component {
    render() {
        return <div className="toolbar-item score-two-player">
            <div className="player-one">Score{" "}
            <span className="score">{this.props.score1}</span>{" "}
            </div>
            <div className="player-two">Score{" "}
            <span className="score">{this.props.score2}</span>{" "}
            </div>
            <span className="high-score">(high {this.props.highScore})</span>
        </div>
    }
};
