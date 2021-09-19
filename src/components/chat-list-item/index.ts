/* eslint-disable class-methods-use-this */
import { compile, Block } from '../../utils/index';
import tmpl from './index.pug';

const logoPlaceholder = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz8giDTG5tei2jTQR1U9GODZF8LLv3uNtJjA&usqp=CAU';

export default class ChatListItem extends Block {
  constructor() {
    super('div');
    this.element.classList.add('chat-list-item');
  }

  render() {
    return compile(tmpl, {
      title: 'Some title',
      logo: logoPlaceholder,
      lastMessage: {
        time: '17:54',
        text: 'Lorem ipsum dolar sit amet',
      },
    });
  }
}
