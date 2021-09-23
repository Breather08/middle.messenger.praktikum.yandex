import { compile, Block } from '../../utils/index';
import { ChatItem } from '../../types/chat';
import tmpl from './index.pug';

export default class ChatListItem extends Block {
  constructor(props: ChatItem) {
    super(
      'div',
      props,
      {
        classes: ['chat-list-item'],
      },
    );
  }

  render() {
    return compile(tmpl, this.props);
  }
}
