import './assets/default.png';
import './assets/error.png';
import './assets/favicon.png';

import './style.scss';

import { setHyperscriptFunction } from 'compote';
import { redraw, mount } from 'mithril';

import { initializeAuth } from './auth';
import { initializeFirebaseApp } from './firebase';
import { Header } from './Header/Header';
import './map';
import { initializeRouter } from './router';
import { Actions, store } from './store';

setHyperscriptFunction(m);
initializeApp();

function initializeApp() {
  initializeFirebaseApp();
  initializeAuth();
  registerServiceWorker();
  initializeRouter();
  subscribeToStore();
  getRequests();
}

function registerServiceWorker() {
  if (process.env.NODE_ENV === 'production' && navigator.serviceWorker) {
    navigator.serviceWorker.register('service-worker.js', { scope: './' });
  }
}

function subscribeToStore() {
  store.subscribe(redraw);

  const header = document.querySelector('#header');
  const unsubscribe = store.subscribe(() => {
    mount(header, Header);
    unsubscribe();
  });
}

// NOTE: This action is also triggered when opening the request list to avoid having outdated data.
// Technically, it should result in 2 HTTP requests if the initial page loaded was the request list,
// but Firebase is smart enough to batch the requests. Be careful with this if we ever change the database mechanism.
function getRequests() {
  store.dispatch({ type: Actions.GET_REQUESTS, filter: { key: 'status', value: 'new' } });
}
