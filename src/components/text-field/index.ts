/* eslint-disable class-methods-use-this */
import Block from '../../utils/block';
import Input from './input';
import compile from '../../utils/compile';
import tmpl from './index.pug';

export default class TextField extends Block {
  constructor(props: {
    label: string;
    inputAttrs?: Record<string, string>;
    events?: Record<string, (e?: Event) => void>;
    attrs?: Record<string, string>;
  }) {
    super('div', props);
  }

  render() {
    const input = new Input({
      attrs: this.props.inputAttrs,
      events: {
        input(e: InputEvent) {
          console.log(e.target);
        },
      },
    });

    return compile(tmpl, {
      label: this.props.label,
      input,
    });
  }
}
