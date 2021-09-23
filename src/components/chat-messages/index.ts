import './index.scss';
import { compile, Block } from '../../utils/index';
import { Message } from '../../types/chat';
import tmpl from './index.pug';

export default class ChatMessages extends Block {
  constructor(props: {
    messages: Message[];
    events?: Record<string, (e?: Event) => void>;
    attrs?: Record<string, string>;
  }) {
    super('div', props, {
      classes: ['chat-messages'],
    });
  }

  render() {
    return compile(tmpl, {
      messages: this.props.messages,
    });
  }
}
