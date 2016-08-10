import React from 'react';

import Score from './Score';
import ScoreMultiPlayer from './ScoreMultiPlayer';
import Reload from './Reload';
import Version from './Version';
import Players from './Players';

export default class extends React.Component {
    render() {
        let score;
        const players = this.props.players;

        if (players.length === 1) {
            score = <Score score={this.props.score} highScore={this.props.highScore}/>;
        } else if (players.length > 1) {
            score = <ScoreMultiPlayer players={players} score1={players['0'].score}
                                    score2={players['1'].score}/>;
        }

        return <div className="toolbar">
            <div className="section-left">
                <Reload onClick={this.props.onReloadClick}/>
                <Players players={players} onChange={this.props.onPlayersChange}/>
            </div>
            <div className="section-middle">
                {score}
            </div>
            <div className="section-right">
                <Version version={this.props.version}/>
            </div>
        </div>
    }
}
