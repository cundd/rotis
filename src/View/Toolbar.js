import React from 'react';

import Score from './Score';
import Reload from './Reload';
import Version from './Version';
import Players from './Players';

export default class extends React.Component {
    render() {
        let score;
        if (this.props.players === 1) {
            score = <Score score={this.props.score} highScore={this.props.highScore}/>;
        }
        return <div className="toolbar">
            {score}
            <Reload onClick={this.props.onReloadClick}/>
            <Players players={this.props.players} onChange={this.props.onPlayersChange}/>
            <Version version={this.props.version}/>
        </div>
    }
}
