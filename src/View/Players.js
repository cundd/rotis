import React from 'react';

export default class extends React.Component {
    onChange(event) {
        this.props.onChange(parseInt(event.currentTarget.value, 10));
    }

    render() {
        const onChange = this.onChange.bind(this);
        const checked = this.props.players;

        console.log(checked);
        return <div className="toolbar-item players">
            <label>
                <input name="players" type="radio" value="1" checked={checked === 1} onChange={onChange}/>
                <span>Single</span>
            </label>
            <label>
                <input name="players" type="radio" value="2" checked={checked === 2} onChange={onChange}/>
                <span>2 Player</span>
            </label>
        </div>
    }
};
