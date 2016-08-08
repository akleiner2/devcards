/* eslint-env browser */
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import { render } from 'react-dom';
import { App, CardPage } from './lib/components/containers';
import React, { Component } from 'react';

import defcard from './lib/defcard';
import atom from './lib/atom';

const APP_STATE = atom({
    currentNamespace: null,
    cards: {}
});

function registerNamespace(namespace) {
    APP_STATE.set(prevState => {
        const state = {
            currentNamespace: namespace,
            cards: prevState.cards
        };
        state.cards[namespace] = [];
        return state;
    });
}

function registerCard(...args) {
    APP_STATE.set(prevState => {
        const cards = prevState.cards;
        cards[prevState.currentNamespace].push({
            func: () => defcard(...args)
        });
        return {
            ...prevState,
            cards
        };
    });
}

function connect(appState, Subject) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = appState.deref();
            appState.listen(state => this.setState(state));
        }
        render() {
            return <Subject {...this.state} {...this.props} />;
        }
    };
}

const ConnectedApp = connect(APP_STATE, App);

window.__DEVCARDS__ = {
    state: APP_STATE,
    registerNamespace,
    registerCard
};

window.describe = (text, fn) => fn();
window.it = (text, fn) => fn();
window.expect = function (exp) {
  return {
    toBe(other) {
      return exp === other;
    },
  };
};

render(
    <Router history={hashHistory}>
        <Route component={ConnectedApp} path="/">
            <IndexRoute component={CardPage} />
            <Route component={CardPage} path="/:ns" />
        </Route>
    </Router>,
    document.getElementById('devcards-root'));
