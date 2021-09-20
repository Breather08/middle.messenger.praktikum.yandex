/* eslint-disable class-methods-use-this */
import './index.scss';
import { compile, Block } from '../../utils/index';
import tmpl from './index.pug';

type Message = {
  text: string;
  time: string;
};

export default class ChatMessages extends Block {
  constructor(props: {
    messages: Message[];
    events?: Record<string, (e?: Event) => void>;
    attrs?: Record<string, string>;
  }) {
    super('div', props);
    this.element.classList.add('chat-messages');
  }

  render() {
    return compile(tmpl, {
      messages: this.props.messages,
    });
  }
}
