/* eslint-disable class-methods-use-this */
import { Block, compile, rules } from '../../utils/index';
import Button from '../../components/button';
import TextField from '../../components/text-field';
import tmpl from './index.pug';

export default class LoginPage extends Block {
  constructor() {
    super('div');
    this.element.classList.add('auth-page__login d-flex align-center');
  }

  render() {
    const formData: Record<string, { value: string; isValid: boolean }> = {};
    let formError = '';

    this.eventBus().on('input', (payload) => {
      const { name, value, isValid } = payload[0];
      formData[name] = { value, isValid };
    });

    const button = new Button({
      content: 'Авторизоваться',
      attrs: {
        class: 'btn btn_block btn_success btn_bold btn_registration',
      },
      events: {
        click() {
          const formEntries = Object.values(formData);
          if (formEntries.length < 7) {
            formError = 'Заполните все поля';
            console.log(formError);
            return;
          }
          formEntries.forEach((params) => {
            if (params.isValid) {
              formError = 'Убедитесь что поля заполнены верно';
            }
          });
          if (!formError) {
            console.log(formData);
          }
        },
      },
    });

    const usernameTextField = new TextField({
      label: 'Логин',
      name: 'username',
      parentEventBus: this.eventBus(),
      inputAttrs: {
        type: 'text',
        autocomplete: 'off',
        name: 'username',
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
      label: 'Пароль',
      name: 'password',
      parentEventBus: this.eventBus(),
      inputAttrs: {
        type: 'password',
        autocomplete: 'off',
        name: 'password',
        id: 'login-password',
      },
      rules: [
        rules.nonEmpty(),
        rules.noWhiteSpace(),
        rules.length(8, 40),
        rules.containsWord(),
        rules.noSpecChars(),
        rules.hasCapitalLetterAndNumber(),
      ],
    });

    return compile(tmpl, {
      button,
      usernameTextField,
      passwordTextField,
    });
  }
}
