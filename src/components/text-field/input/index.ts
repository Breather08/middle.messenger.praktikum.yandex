/* eslint-disable class-methods-use-this */
import Block from '../../../utils/block';

type InputEvents = {
  focus?: (e: FocusEvent) => void;
  blur?: (e: FocusEvent) => void,
  focusin?: (e: FocusEvent) => void;
  focusout?: (e: FocusEvent) => void;
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
    return new DocumentFragment();
  }
}
