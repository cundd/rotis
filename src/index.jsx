'use strict'

import React from 'react';
import ReactDOM from 'react-dom';

import Store from './Store';
import GameWindow from './View/GameWindow';
import ClickHandler from './ClickHandler';


const clickHandler = new ClickHandler();

const render = function (store) {
    return ReactDOM.render(<GameWindow store={store.getState()} clickHandler={clickHandler} />, document.getElementById('content'));
}

new Store(render, clickHandler);
