import { Block } from '..';

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  root?.append(block.element);
  return root;
}

export default class Route<T extends Block> {
  _pathname: string;

  _blockClass: new() => T;

  _props: Record<string, any>;

  _block: Block | null;

  constructor(pathname: string, view: new() => T, props: Record<string, any>) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}
