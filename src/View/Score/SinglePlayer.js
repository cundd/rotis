import React from 'react';

export default class SinglePlayer extends React.Component {
    render() {
        console.log('highscore changed: ', this.props.highScore.changed);
        return <div className="toolbar-item score">Score{" "}
            <span className="score">{this.props.score}</span>{" "}
            <span className="high-score">(high {this.props.highScore.previousScore})</span>
        </div>
    }
};
