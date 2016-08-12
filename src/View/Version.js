import React from 'react';
import Modal from './Modal';

export default class Version extends React.PureComponent{
    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.showModal !== nextState.showModal
    //         || this.props.version !== nextProps.version;
    // }

    onModalClick(event) {
        event.stopPropagation();
        this.setState({showModal: false});
    }

    onVersionClick() {
        this.setState({showModal: true});
    }

    render() {
        const _onModalClick = this.onModalClick.bind(this);
        const _onVersionClick = this.onVersionClick.bind(this);

        let modal;
        if (this.state.showModal) {
            modal = <Modal heading="Rotis" onClick={_onModalClick}>&copy; Daniel Corn 2016</Modal>
        }

        return <div className="toolbar-item -right version" onClick={_onVersionClick}>
            v{this.props.version}
            {modal}
        </div>;
    }
};
