import React from 'react';
import PlayersInput from './PlayersInput';

export default class Players extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.players.length !== nextProps.players.length;
    }

    onChange(event) {
        this.props.onChange(parseInt(event.target.value, 10));
    }

    render() {
        const onChange = this.onChange.bind(this);
        const numberOfPlayers = this.props.players.keys().length;

        return <div className="toolbar-item players">
            <label>
                <PlayersInput numberOfPlayers={numberOfPlayers} value="1" onChange={onChange}/>
                <span>Single</span>
            </label>
            <label>
                <PlayersInput numberOfPlayers={numberOfPlayers} value="2" onChange={onChange}/>
                <span>2 Player</span>
            </label>
        </div>;
    }
};
