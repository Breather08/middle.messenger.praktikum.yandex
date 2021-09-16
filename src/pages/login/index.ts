/* eslint-disable class-methods-use-this */
import { Block } from '../../utils/index';
import Button from '../../components/button';
import TextField from '../../components/text-field';
import compile from '../../utils/compile';
import tmpl from './index.pug';

export default class LoginPage extends Block {
  constructor() {
    super('div');
  }

  render() {
    const button = new Button({
      content: 'Авторизоваться',
      attrs: {
        class: 'btn btn_block btn_success btn_bold btn_login',
      },
      events: {
        click() {
          console.log('clicked');
        },
      },
    });

    const usernameTextField = new TextField({
      label: 'Username',
      inputAttrs: {
        type: 'text',
        id: 'login-username',
      },
    });

    const passwordTextField = new TextField({
      label: 'Password',
      inputAttrs: {
        type: 'password',
        id: 'login-password',
      },
    });

    return compile(tmpl, {
      button,
      usernameTextField,
      passwordTextField,
    });
  }
}
