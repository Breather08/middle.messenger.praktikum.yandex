/* eslint-disable class-methods-use-this */
import Block from '../../../utils/block';
import compile from '../../../utils/compile';
import tmpl from './index.pug';

export default class Message extends Block {
  constructor(props: { content: string; attrs?: Record<string, string> }) {
    super('div', props);
  }

  render() {
    return compile(tmpl, {
      message: this.props.content,
    });
  }
}
