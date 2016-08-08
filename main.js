/* eslint-env browser */
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import { render } from 'react-dom';
import { App, CardPage } from './lib/components/containers';
import React, { Component } from 'react';

import defcard from './lib/defcard';

const APP_STATE = {};

function registerNamespace(ns) {
    APP_STATE[ns] = {
        cards: []
    };
}

function registerCard(ns, ...args) {
    APP_STATE[ns].cards.push({
        func: () => defcard(ns, ...args)
    });
}

function connect(appState, Subject) {
    return class extends Component {
        constructor(props) {
            super(props);
        }
        render() {
            return <Subject cards={APP_STATE} {...this.props} />;
        }
    };
}

function run() {
  const ConnectedApp = connect(APP_STATE, App);

  render(
      <Router history={hashHistory}>
          <Route component={ConnectedApp} path="/">
              <IndexRoute component={CardPage} />
              <Route component={CardPage} path="/:ns" />
          </Route>
      </Router>,
      document.getElementById('devcards-root'));
}

export { registerNamespace, registerCard, run };
