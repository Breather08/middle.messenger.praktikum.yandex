import './assets/styles/global.scss';
import ChatPage from './pages/chat';
import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import NavBar from './components/nav';
import { Block, compile } from './utils';
import tmpl from './index.pug';
import Router from './utils/router/router';

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
    const navbar = new NavBar();

    return compile(tmpl, {
      navbar,
    });
  }
}

const app = new App();

render('body', app);

const router = new Router('.app');

router
  .use('/login', LoginPage)
  .use('/chat', ChatPage)
  .use('/registration', RegistrationPage)
  .start();
