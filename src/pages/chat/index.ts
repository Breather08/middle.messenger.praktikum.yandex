import './index.scss';
import { Block, compile } from '../../utils/index';
import Input from '../../components/input';
import ChatListItem from '../../components/chat-list-item';
import ChatActions from '../../components/chat-actions';
import ChatMessages from '../../components/chat-messages';
import { Message } from '../../types/chat';
import tmpl from './index.pug';

const logoPlaceholder =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz8giDTG5tei2jTQR1U9GODZF8LLv3uNtJjA&usqp=CAU';

export default class ChatPage extends Block {
  constructor() {
    super(
      'div',
      {},
      {
        classes: ['chat-page'],
      },
    );
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

    const chatListItem = new ChatListItem({
      title: 'Some title',
      logo: logoPlaceholder,
      lastMessage: {
        time: '17:54',
        text: 'Lorem ipsum dolar sit amet',
      },
    });

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
