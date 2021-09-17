/* eslint-disable class-methods-use-this */
import Block from '../../utils/block';
import Input from './input';
import Message from './message';
import compile from '../../utils/compile';
import { RuleParams } from '../../types/rules';
import tmpl from './index.pug';

export default class TextField extends Block {
  constructor(props: {
    label: string;
    rules?: Array<RuleParams>;
    message?: string;
    inputAttrs?: Record<string, string>;
    events?: Record<string, (e?: Event) => void>;
    attrs?: Record<string, string>;
  }) {
    super('div', props);
  }

  render() {
    const { rules } = this.props;

    const data = {
      inputModel: this.props.inputAttrs.value,
      message: this.props.message,
    };

    const message = new Message({
      content: '',
    });

    const input = new Input({
      attrs: this.props.inputAttrs,
      events: {
        input(e: InputEvent) {
          const target = e.target as HTMLInputElement;
          data.inputModel = target.value;
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
            (rule: RuleParams): boolean => rule.fn(target.value) !== true,
          );
          if (nonValidRule) {
            message.setProps({
              content: nonValidRule.text,
              attrs: {
                class: 'show',
              },
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
