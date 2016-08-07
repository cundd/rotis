import React from 'react';
import ReactDOM from 'react-dom';
import App from './View/App';
import './Stylesheets/index.css';

import IrLib from 'irlib/dist/irlib';

import Store from './Store';
import GameWindow from './View/GameWindow';
import ClickHandler from './ClickHandler';
import Environment from './Environment';


const sl = new IrLib.ServiceLocator();

sl.registerMultiple({
    clickHandler: ClickHandler,
    store: Store,
    environment: Environment
});

sl.create('store', function () {
    const clickHandler = sl.get('clickHandler');
    return ReactDOM.render(
        <App clickHandler={clickHandler}/>,
        document.getElementById('root')
    );
});
