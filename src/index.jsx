'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Store from './Store';
import GameWindow from './View/GameWindow';
import ClickHandler from './ClickHandler';
import Environment from './Environment';


const clickHandler = new ClickHandler();

const render = function (store) {
    // return ReactDOM.render(<div>
        {/*<GameWindow store={store} clickHandler={clickHandler} />*/}
        {/*<GameWindow store={store} clickHandler={clickHandler} />*/}
    // </div>, document.getElementById('content'));
    return ReactDOM.render(<GameWindow store={store} clickHandler={clickHandler} />, document.getElementById('content'));
};

(new Environment()).prepare();

new Store(render, clickHandler);

