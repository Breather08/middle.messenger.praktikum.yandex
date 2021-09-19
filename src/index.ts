import './assets/styles/global.scss';
import ChatPage from './pages/chat';
import { Block } from './utils';

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  root?.append(block.element);

  return root;
}

const loginPage = new ChatPage();

render('body', loginPage);
