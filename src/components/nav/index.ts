import './index.scss';
import { Block, compile } from '../../utils';
import { Route } from '../../types/routing';
import LoginPage from '../../pages/login';
import RegistrationPage from '../../pages/registration';
import ChatPage from '../../pages/chat';
import tmpl from './index.pug';

export default class NavBar extends Block {
  constructor() {
    super(
      'div',
      {},
      {
        classes: ['navbar'],
      },
    );
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
