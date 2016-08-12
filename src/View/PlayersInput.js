import React from 'react';

export default class PlayersInput extends React.PureComponent {
    render() {
        const attributes = {
            name: 'players',
            type: 'radio',
            onChange: this.props.onChange,
            value: this.props.value,
            checked: this.props.numberOfPlayers === parseInt(this.props.value, 10)
        };

        return <input {...attributes}/>;
    }
};
