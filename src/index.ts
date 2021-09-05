import './assets/styles/global.scss';
import setActivePage from './utils/setActivePage';

// Page wrappers
const loginPageWrapper = document.querySelector('.login');
const registrationPageWrapper = document.querySelector('.registration');
const chatPageWrapper = document.querySelector('.chat-page');

// Links
const registrationBtn = document.querySelector('.btn__registration');
const loginBtn = document.querySelector('.btn__login');
const hasAccountLink = document.querySelector('#has-account-link');
const noAccountLink = document.querySelector('#no-account-link');
const logout = document.querySelector('#logout');

loginBtn?.addEventListener('click', () => {
  setActivePage(chatPageWrapper);
});
registrationBtn?.addEventListener('click', () => {
  setActivePage(chatPageWrapper);
});
hasAccountLink?.addEventListener('click', () => {
  setActivePage(loginPageWrapper);
});
noAccountLink?.addEventListener('click', () => {
  setActivePage(registrationPageWrapper);
});
logout?.addEventListener('click', () => {
  setActivePage(loginPageWrapper);
});
