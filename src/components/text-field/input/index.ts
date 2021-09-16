/* eslint-disable class-methods-use-this */
import Block from '../../../utils/block';

type InputEvents = {
  focus?: (e: FocusEvent) => void;
  focusIn?: (e: FocusEvent) => void;
  focusOut?: (e: FocusEvent) => void;
  input?: (e: InputEvent) => void;
  keyup?: (e: KeyboardEvent) => void;
  keyDown?: (e: KeyboardEvent) => void;
};

export default class Input extends Block {
  constructor(props: {
    events?: InputEvents;
    attrs?: Record<string, string>;
  }) {
    super('input', props);
  }

  render() {
    console.log(this.props);
    return new DocumentFragment();
  }
}
