/* eslint-disable class-methods-use-this */
import { Block, compile, rules, masks } from '../../utils/index';
import Button from '../../components/button';
import TextField from '../../components/text-field';
import tmpl from './index.pug';

export default class RegistrationPage extends Block {
  constructor() {
    super('div');

    this.eventBus().on('test', (payload) => {
      console.log('Payload', payload);
    });
  }

  render() {
    const button = new Button({
      content: 'Авторизоваться',
      attrs: {
        class: 'btn btn_block btn_success btn_bold btn_registration',
      },
      events: {
        click() {
          console.log('click');
        },
      },
    });

    const usernameTextField = new TextField({
      label: 'Логин',
      localEventBus: this.eventBus(),
      inputAttrs: {
        type: 'text',
        autocomplete: 'off',
        name: 'username',
        id: 'registration-username',
      },
      rules: [
        rules.nonEmpty(),
        rules.noWhiteSpace(),
        rules.length(3, 20),
        rules.containsWord(),
        rules.noSpecChars('-_'),
      ],
    });

    const emailTextField = new TextField({
      label: 'Почта',
      inputAttrs: {
        type: 'email',
        autocomplete: 'off',
        name: 'email',
        id: 'registration-email',
      },
      rules: [rules.nonEmpty(), rules.validEmail()],
    });

    const firstNameTextField = new TextField({
      label: 'Имя',
      inputAttrs: {
        type: 'text',
        autocomplete: 'off',
        name: 'first-name',
        id: 'registration-first-name',
      },
      rules: [rules.nonEmpty(), rules.validName()],
    });

    const lastNameTextField = new TextField({
      label: 'Фамилия',
      inputAttrs: {
        type: 'text',
        autocomplete: 'off',
        name: 'last-name',
        id: 'registration-last-name',
      },
      rules: [rules.nonEmpty(), rules.validName()],
    });

    const phoneTextField = new TextField({
      label: 'Телефон',
      inputAttrs: {
        type: 'tel',
        autocomplete: 'off',
        name: 'phone',
        id: 'registration-phone',
      },
      rules: [rules.nonEmpty(), rules.validPhone()],
      mask: masks.phoneMask,
    });

    const passwordTextField = new TextField({
      label: 'Пароль',
      inputAttrs: {
        type: 'pasword',
        autocomplete: 'off',
        name: 'password',
        id: 'registration-password',
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

    const passwordRepeatTextField = new TextField({
      label: 'Повторите пароль',
      inputAttrs: {
        type: 'password',
        autocomplete: 'off',
        name: 'repeat-password',
        id: 'registration-password-repeat',
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
      emailTextField,
      usernameTextField,
      firstNameTextField,
      lastNameTextField,
      phoneTextField,
      passwordTextField,
      passwordRepeatTextField,
    });
  }
}
