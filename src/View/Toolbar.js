import React from 'react';

import ScoreSinglePlayer from './Score/SinglePlayer';
import ScoreMultiPlayer from './Score/MultiPlayer';
import Reload from './Reload';
import Version from './Version';
import Players from './Players';

export default class Toolbar extends React.Component {
    render() {
        let score;
        const players = this.props.players;

        if (players.length === 1) {
            score = <ScoreSinglePlayer score={players['0'].score} highScore={this.props.highScore} />;
        } else if (players.length > 1) {
            score = <ScoreMultiPlayer players={players}/>;
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
