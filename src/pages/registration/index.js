import '../../assets/styles/global.scss'
import homePage from '../chat/index.pug'
import loginPage from '../login/index.pug'

console.log('Registration page script loaded')

const registrationBtn = document.querySelector('button')
registrationBtn.addEventListener('click', () => {
    window.location.replace(homePage);
})

const loginHref = document.querySelector('#has-account-link')
loginHref.addEventListener('click', () => {
    window.location.replace(loginPage);
})