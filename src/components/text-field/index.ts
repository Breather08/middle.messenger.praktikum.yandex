import './index.scss';
import Input from '../input';
import { Rule } from '../../types/rules';
import { EventBus, compile, Block } from '../../utils/index';
import tmpl from './index.pug';

const findByClassList = (arr: NodeList, className: string): Node | undefined =>
  Array.from(arr).find((item: HTMLElement) =>
    item.classList.contains(className),
  );

export default class TextField extends Block {
  labelDOM = findByClassList(
    this.element.childNodes,
    'text-field__label',
  ) as HTMLElement;

  messageDOM = findByClassList(
    this.element.childNodes,
    'text-field__message',
  ) as HTMLElement;

  constructor(props: {
    label: string;
    name: string;
    parentEventBus: EventBus;
    rules?: Rule[];
    mask?: (val: string) => string;
    message?: string;
    inputAttrs?: Record<string, string>;
    events?: Record<string, (e?: Event) => void>;
    attrs?: Record<string, string>;
  }) {
    super('div', props);
    this.element.classList.add('text-field');
  }

  render() {
    const { rules } = this.props;
    const input = new Input({
      attrs: this.props.inputAttrs,
      events: {
        input: (e: InputEvent) => {
          const target = e.target as HTMLInputElement;
          if (this.props.mask) {
            target.value = this.props.mask(target.value);
          }
        },
        focus: () => {
          const message = this.messageDOM;
          message.innerText = '';
        },
        blur: (e) => {
          const { parentEventBus, name } = this.props;
          const message = this.messageDOM;
          const target = e?.target as HTMLInputElement;
          if (!rules) {
            parentEventBus.emit('input', { name, value: target.value, isValid: true });
            return;
          }
          const nonValidRule = rules.find(
            (rule: Rule): boolean => rule.fn(target.value) !== true,
          );
          parentEventBus.emit('input', { name, value: target.value, isValid: !nonValidRule });
          if (nonValidRule) {
            message.innerText = nonValidRule.text;
          }
        },
      },
    });

    return compile(tmpl, {
      label: this.props.label,
      input,
    });
  }
}
