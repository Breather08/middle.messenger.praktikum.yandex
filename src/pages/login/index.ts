/* eslint-disable class-methods-use-this */
import { Block } from '../../utils/index';
import Button from '../../components/button';
import TextField from '../../components/text-field';
import compile from '../../utils/compile';
import { Rules } from '../../types/rules';
import tmpl from './index.pug';

const rules: Rules = {
  empty: {
    text: 'Это обязательное поле',
    fn: (v: string) => !!v,
  },
  length: {
    text: 'Поле может содержать от 3 до 20 символов',
    fn: (v: string) => /^\w{3,20}$/.test(v),
  },
};

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
      rules: [rules.empty, rules.length],
    });

    const passwordTextField = new TextField({
      label: 'Password',
      inputAttrs: {
        type: 'password',
        id: 'login-password',
      },
      rules: [rules.empty, rules.length],
    });

    return compile(tmpl, {
      button,
      usernameTextField,
      passwordTextField,
    });
  }
}
