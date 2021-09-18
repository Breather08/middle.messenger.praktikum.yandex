/* eslint-disable class-methods-use-this */
import { Block, compile, rules } from '../../utils/index';
import Button from '../../components/button';
import TextField from '../../components/text-field';
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
      rules: [
        rules.nonEmpty(),
        rules.noWhiteSpace(),
        rules.length(3, 20),
        rules.containsWord(),
        rules.noSpecChars('-_'),
      ],
    });

    const passwordTextField = new TextField({
      label: 'Password',
      inputAttrs: {
        type: 'password',
        id: 'login-password',
      },
      rules: [
        rules.nonEmpty(),
        rules.noWhiteSpace(),
        rules.length(8, 40),
        rules.containsWord(),
        rules.noSpecChars(),
      ],
    });

    return compile(tmpl, {
      button,
      usernameTextField,
      passwordTextField,
    });
  }
}
