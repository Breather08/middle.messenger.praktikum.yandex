/* eslint-disable class-methods-use-this */
import Input from './input';
import Message from './message';
import { Rule } from '../../types/rules';
import { EventBus, compile, Block } from '../../utils/index';
import tmpl from './index.pug';

export default class TextField extends Block {
  constructor(props: {
    label: string;
    localEventBus?: EventBus;
    rules?: Array<Rule>;
    mask?: (val: string) => string;
    message?: string;
    inputAttrs?: Record<string, string>;
    events?: Record<string, (e?: Event) => void>;
    attrs?: Record<string, string>;
  }) {
    super('div', props);
  }

  render() {
    const { rules } = this.props;
    const self = this;

    const message = new Message({
      content: '',
    });

    const input = new Input({
      attrs: this.props.inputAttrs,
      events: {
        input(e: InputEvent) {
          const target = e.target as HTMLInputElement;
          if (self.props.mask) {
            target.value = self.props.mask(target.value);
          }
          self.props.localEventBus.emit('test', 'test');
        },
        focus() {
          message.setProps({
            content: '',
          });
        },
        blur(e) {
          const target = e.target as HTMLInputElement;
          if (!rules) {
            return;
          }
          const nonValidRule = rules.find(
            (rule: Rule): boolean => rule.fn(target.value) !== true,
          );
          if (nonValidRule) {
            message.setProps({
              content: nonValidRule.text,
            });
          }
        },
      },
    });

    return compile(tmpl, {
      label: this.props.label,
      message,
      input,
    });
  }
}
