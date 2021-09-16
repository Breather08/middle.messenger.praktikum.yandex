import './assets/styles/global.scss';
import LoginPage from './pages/login/index';
import { Block } from './utils';

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  root?.append(block.element);

  return root;
}

const loginPage = new LoginPage();

render('body', loginPage);
