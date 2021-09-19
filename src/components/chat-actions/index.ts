/* eslint-disable class-methods-use-this */
import './index.scss';
import Input from '../input';
import { EventBus, compile, Block } from '../../utils/index';
import tmpl from './index.pug';

export default class ChatActions extends Block {
  constructor(props: {
    parentEventBus: EventBus;
    events?: Record<string, (e?: Event) => void>;
    attrs?: Record<string, string>;
  }) {
    super('div', props);
    this.element.classList.add('chat-actions');
  }

  render() {
    const input = new Input({
      attrs: this.props.inputAttrs,
      events: {
        input(e: InputEvent) {
          const target = e.target as HTMLInputElement;
          this.props.parentEventBus.emit('input', target);
        },
      },
    });

    return compile(tmpl, {
      label: this.props.label,
      input,
    });
  }
}
