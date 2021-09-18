import { Rules } from '../types/rules';

const rules: Rules = {
  containsWord: () => ({
    text: 'Поле должно содержать хотя бы одну букву',
    fn: (v) => /[a-z]/i.test(v),
  }),
  firstCapital: () => ({
    text: 'Первая буква должна быть заглавной',
    fn: (v) => /^[A-ZА-Я]/.test(v),
  }),
  hasCapitalLetterAndNumber: () => ({
    text: 'Поле должно содержать хотя бы одну заглавную букву и цифру',
    fn: (v) => /[A-Z]/.test(v) && /\d/.test(v),
  }),
  length: <T>(start: T, end: T) => ({
    text: `Поле может содержать от ${start} до ${end} символов`,
    fn: (v: string) => {
      const regx = new RegExp(`^.{${start},${end}}$`);
      return regx.test(v);
    },
  }),
  nonEmpty: () => ({
    text: 'Это обязательное поле',
    fn: (v: string) => !!v,
  }),
  noSpecChars: (allowedChars) => ({
    text: 'Поле содержит недопустимые символы',
    fn: (v) => new RegExp(`^[a-z0-9${allowedChars}]*$`, 'i').test(v),
  }),
  noWhiteSpace: () => ({
    text: 'Поле не может содержать пробелы',
    fn: (v) => !/\s/.test(v),
  }),
  matchingPasswords: (password) => ({
    text: 'Пароли должны совпадать',
    fn: (v) => v === String(password),
  }),
  validEmail: () => ({
    text: 'Почта должна соответсвовать шаблону: emailaddress@example.com',
    fn: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  }),
  validName: () => ({
    text: 'Неверное содержание поля',
    fn: (v) => /^[A-ZА-Я][a-zа-я-]*$/.test(v),
  }),
  validPhone: () => ({
    text: ' Неверный формат телефона',
    fn: (v) => /^\+7\s(\(\d{3}\)\s\d{3}-\d{2}-\d{2})$/.test(v),
  }),
};

export default rules;
