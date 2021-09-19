/* eslint-disable class-methods-use-this */
import Block from '../../utils/block';

export default class Input extends Block {
  constructor(props: {
    events?: Record<string, (e?: Event) => void>;
    attrs?: Record<string, string>;
  }) {
    super('input', props);
  }

  render() {
    return new DocumentFragment();
  }
}
