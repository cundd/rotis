import React from 'react';

import Score from './Score';
import ScoreTwoPlayer from './ScoreTwoPlayer';
import Reload from './Reload';
import Version from './Version';
import Players from './Players';

export default class extends React.Component {
    render() {
        let score;
        if (this.props.players === 1) {
            score = <Score score={this.props.score} highScore={this.props.highScore}/>;
        } else {
            score = <ScoreTwoPlayer score1={this.props.score} score2={this.props.score2}/>;

        }
        return <div className="toolbar">
            <div className="section-left">
                <Reload onClick={this.props.onReloadClick}/>
                <Players players={this.props.players} onChange={this.props.onPlayersChange}/>
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
