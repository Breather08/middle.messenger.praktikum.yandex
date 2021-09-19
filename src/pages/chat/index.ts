/* eslint-disable class-methods-use-this */
import { Block, compile } from '../../utils/index';
import Input from '../../components/input';
import ChatListItem from '../../components/chat-list-item';
import ChatActions from '../../components/chat-actions';
import tmpl from './index.pug';

export default class ChatPage extends Block {
  constructor() {
    super('div');
    this.element.classList.add('chat-page');
  }

  render() {
    const input = new Input({
      attrs: {
        placeholder: 'Поиск',
      },
      events: {
        input(e: Event) {
          const target = e?.target as HTMLElement;
          console.log(target);
        },
      },
    });

    const chatListItem = new ChatListItem();

    const chatActions = new ChatActions({
      parentEventBus: this.eventBus(),
    });

    return compile(tmpl, {
      input,
      chatListItem,
      chatActions,
    });
  }
}
