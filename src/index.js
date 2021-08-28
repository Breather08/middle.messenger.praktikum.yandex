import "./assets/styles/global.scss";
import { setActivePage } from './utils/utils'

// Pages
const loginPageWrapper = document.querySelector(".login");
const registrationPageWrapper = document.querySelector(".registration");
const chatPageWrapper = document.querySelector(".chat-page");

// Links
const registrationBtn = document.querySelector(".registration-btn");
const loginBtn = document.querySelector(".login-btn");
const hasAccountLink = document.querySelector("#has-account-link");
const noAccountLink = document.querySelector("#no-account-link");
const logout = document.querySelector("#logout");

loginBtn.addEventListener("click", () => {
  setActivePage(chatPageWrapper);
});
registrationBtn.addEventListener("click", () => {
  setActivePage(chatPageWrapper);
});
hasAccountLink.addEventListener("click", () => {
  setActivePage(loginPageWrapper);
});
noAccountLink.addEventListener("click", () => {
  setActivePage(registrationPageWrapper);
});
logout.addEventListener('click', () => {
  setActivePage(loginPageWrapper);
})
