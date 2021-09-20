/* eslint-disable class-methods-use-this */
import './index.scss';
import Input from '../input';
import { EventBus, compile, Block } from '../../utils/index';
import tmpl from './index.pug';
import Button from '../button';

export default class ChatActions extends Block {
  constructor(props: {
    parentEventBus: EventBus;
    inputAttrs?: Record<string, string>;
    events?: Record<string, (e?: Event) => void>;
    attrs?: Record<string, string>;
  }) {
    super('div', props);
    this.element.classList.add('chat-actions');
  }

  render() {
    let message = '';

    const input = new Input({
      attrs: this.props.inputAttrs,
      events: {
        keyup: (e: KeyboardEvent) => {
          const target = e.target as HTMLInputElement;
          message = target.value;
          if (e.key === 'Enter') {
            this.eventBus().emit('send-message');
          }
        },
      },
    });

    const button = new Button({
      content: 'send',
      events: {
        click: () => {
          this.eventBus().emit('send-message', message);
        },
      },
    });

    this.eventBus().on('send-message', () => {
      const { parentEventBus } = this.props;
      const inputElement = input.element as HTMLInputElement;
      inputElement.value = '';
      if (message.length > 0) {
        parentEventBus.emit('send', message);
      }
    });

    return compile(tmpl, {
      label: this.props.label,
      input,
      button,
    });
  }
}
