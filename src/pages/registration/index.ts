/* eslint-disable class-methods-use-this */
import { Block, compile, rules, masks } from '../../utils/index';
import Button from '../../components/button';
import TextField from '../../components/text-field';
import tmpl from './index.pug';

export default class RegistrationPage extends Block {
  constructor() {
    super('div');
    this.element.classList.add('auth-page__registration');
  }

  render() {
    const formData: Record<string, { value: string; isValid: boolean }> = {};
    let formError = '';

    this.eventBus().on('input', (payload) => {
      const { name, value, isValid } = payload[0];
      formData[name] = { value, isValid };
    });

    const button = new Button({
      content: 'Зарегистрироваться',
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
          } else {
            alert(formError);
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
      name: 'email',
      parentEventBus: this.eventBus(),
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
      name: 'firstName',
      parentEventBus: this.eventBus(),
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
      name: 'lastName',
      parentEventBus: this.eventBus(),
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
      name: 'phone',
      parentEventBus: this.eventBus(),
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
      name: 'password',
      parentEventBus: this.eventBus(),
      inputAttrs: {
        type: 'password',
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
      name: 'passwordRepeat',
      parentEventBus: this.eventBus(),
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
        rules.matchingPasswords(formData.password),
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
