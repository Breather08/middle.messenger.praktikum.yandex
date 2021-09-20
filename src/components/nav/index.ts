import { Block, compile } from '../../utils';
import LoginPage from '../../pages/login';
import RegistrationPage from '../../pages/registration';
import ChatPage from '../../pages/chat';
import tmpl from './index.pug';

type Route = {
  path: string;
  name: string;
  title: string;
  component: Block;
};

export default class NavBar extends Block {
  constructor() {
    super('div');
    this.element.classList.add('navbar');
  }

  render() {
    const routes: Route[] = [
      {
        path: '/login',
        title: 'Логин',
        name: 'login',
        component: new LoginPage(),
      },
      {
        path: '/registration',
        title: 'Регистрация',
        name: 'registration',
        component: new RegistrationPage(),
      },
      {
        path: '/chat',
        title: 'Чат',
        name: 'chat',
        component: new ChatPage(),
      },
    ];

    return compile(tmpl, {
      currentRoute: '',
      routes,
    });
  }
}
