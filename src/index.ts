import './assets/styles/global.scss';
import RegistrationPage from './pages/registration/index';
import { Block } from './utils';

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  root?.append(block.element);

  return root;
}

const loginPage = new RegistrationPage();

render('body', loginPage);
