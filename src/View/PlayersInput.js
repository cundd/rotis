import React from 'react';

export default class extends React.Component {
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
