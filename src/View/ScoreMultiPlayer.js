import React from 'react';

export default class extends React.Component {
    render() {
        const createPlayer = function (player, index) {
            const key = 'player' + index;
            const className = "player player-" + index;
            return <div className={className} key={key}>
                <span className="score">{player.score}</span>
            </div>;
        };
        const createSeparator = function (index) {
            const key = 'separator' + index;
            return <div className="separator" key={key}>x</div>;
        };

        let contents = [];
        const players = this.props.players.values();
        const playersLength = players.length;

        for (let i = 0; i < playersLength; i++) {
            contents.push(createPlayer(players[i], i));
            if (i + 1 < playersLength) {
                contents.push(createSeparator(i));
            }
        }


        return <div className="toolbar-item score-two-player">
            <span className="label">Score</span>
            {contents}
        </div>;

        // return <div className="toolbar-item score-two-player">
        //     <span className="label">Score</span>
        //     <div className="player player-one">
        //         <span className="score">{this.props.score1}</span>
        //     </div>
        //     <div className="separator">x</div>
        //     <div className="player player-two">
        //         <span className="score">{this.props.score2}</span>
        //     </div>
        // </div>;
    }
};
