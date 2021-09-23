import './assets/styles/global.scss';
import ChatPage from './pages/chat';
import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import NavBar from './components/nav';
import { Block, compile } from './utils';
import tmpl from './index.pug';

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  root?.append(block.element);

  return root;
}

class App extends Block {
  constructor() {
    super('div');
    this.element.classList.add('app');
  }

  render() {
    const loginPage = new LoginPage();
    const registrationPage = new RegistrationPage();
    const chatPage = new ChatPage();
    const navbar = new NavBar();

    let currentPage = registrationPage;
    loginPage.hide();
    chatPage.hide();

    const routeLinks = navbar.element.querySelectorAll('.router-link');
    routeLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const attrs = link.attributes as NamedNodeMap;
        const routeName = attrs.getNamedItem('route-name')?.value;
        if (routeName === 'login') {
          currentPage.hide();
          loginPage.show();
          currentPage = loginPage;
        } else if (routeName === 'registration') {
          currentPage.hide();
          registrationPage.show();
          currentPage = registrationPage;
        } else if (routeName === 'chat') {
          currentPage.hide();
          chatPage.show();
          currentPage = chatPage;
        }
      });
    });

    return compile(tmpl, {
      navbar,
      loginPage,
      registrationPage,
      chatPage,
    });
  }
}

const app = new App();

render('body', app);
