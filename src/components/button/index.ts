import Block from '../../utils/block';
import fn from './index.pug';

export default class Button extends Block {
  constructor(props: {
    content: string;
    events?: Record<string, (e?: Event) => void>;
    attrs?: Record<string, string>;
  }) {
    super('button', props);
  }

  render() {
    return fn(this.props);
  }
}
