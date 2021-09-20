/* eslint-disable class-methods-use-this */
import { Block, compile } from '../../utils/index';
import Input from '../../components/input';
import ChatListItem from '../../components/chat-list-item';
import ChatActions from '../../components/chat-actions';
import tmpl from './index.pug';
import ChatMessages from '../../components/chat-messages';

type Message = {
  text: string;
  time: string;
};

export default class ChatPage extends Block {
  constructor() {
    super('div');
    this.element.classList.add('chat-page');
  }

  render() {
    const messages: Message[] = [
      {
        text: 'Type something',
        time: '15:34',
      },
      {
        text: 'Отправка сообщений работает при нажатии Enter',
        time: '15:35',
      },
    ];

    const input = new Input({
      attrs: {
        placeholder: 'Поиск',
      },
      events: {
        input: (e: Event) => {
          const target = e.target as HTMLInputElement;
          console.log(target.value);
        },
      },
    });

    const chatListItem = new ChatListItem();

    const chatMessages = new ChatMessages({
      messages,
    });

    const chatActions = new ChatActions({
      inputAttrs: {
        placeholder: 'Сообщение',
      },
      parentEventBus: this.eventBus(),
    });

    this.eventBus().on('send', (payload) => {
      const message: Message = {
        text: payload[0],
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      };
      messages.push(message);
      chatMessages.setProps({
        messages,
      });
    });

    return compile(tmpl, {
      input,
      chatListItem,
      chatActions,
      chatMessages,
    });
  }
}
