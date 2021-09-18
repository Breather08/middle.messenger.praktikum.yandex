import { Rules } from '../types/rules';

const rules: Rules = {
  empty: () => ({
    text: 'Это обязательное поле',
    fn: (v: string) => !!v,
  }),
  length: <T>(start: T, end: T) => ({
    text: `Поле может содержать от ${start} до ${end} символов`,
    fn: (v: string) => {
      const regx = new RegExp(`^.{${start},${end}}$`);
      return regx.test(v);
    },
  }),
  noWhiteSpace: () => ({
    text: 'Поле не может содержать пробелы',
    fn: (v) => !/\s/.test(v),
  }),
  containsWord: () => ({
    text: 'Поле должно содержать хотя бы одну букву',
    fn: (v) => /[a-z]/i.test(v),
  }),
  noSpecChars: (allowedChars) => ({
    text: 'Поле содержит недопустимые символы',
    fn: (v) => new RegExp(`^[a-z0-9${allowedChars}]*$`, 'i').test(v),
  }),
  firstCapital: () => ({
    text: 'Первая буква должна быть заглавной',
    fn: (v) => /^[A-ZА-Я]/.test(v),
  }),
  isName: (fieldName) => ({
    text: `Некорректное ${fieldName}`,
    fn: (v) => /^[a-zа-я]*$/i.test(v),
  }),
};

export default rules;
