/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import pug from 'pug';
import EventBus from './eventBus';

type Meta = {
  tagName: string;
  props: unknown;
};

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private privateElement: HTMLElement;

  private meta: Meta;

  public props = {};

  public eventBus: () => EventBus;

  constructor(tagName: string = 'div', props = {}) {
    const eventBus = new EventBus();
    this.meta = {
      tagName,
      props,
    };

    this.props = this.makePropsProxy(props);

    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this.onComponentMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this.onComponentUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this.onRender.bind(this));
  }

  private createResources() {
    const { tagName } = this.meta;
    this.privateElement = this.createDocumentElement(tagName);
  }

  init() {
    this.createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private onComponentMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(oldProps = {}) {}

  private onComponentUpdate(oldProps = {}, newProps = {}) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.onRender();
  }

  componentDidUpdate(oldProps = {}, newProps = {}): boolean {
    return true;
  }

  setProps = (nextProps = {}) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this.privateElement;
  }

  private onRender() {
    const block = this.render();
    this.privateElement.innerHTML = pug.render(block);
  }

  render() {
    return '';
  }

  getContent() {
    return this.element;
  }

  private makePropsProxy(props = {}) {
    const self = this;
    const oldProps = { ...props };
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создает сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }
}

// class Button extends Block {
//   constructor(props) {
//     // Создаём враппер дом-элемент button
//     super('button', props);
//   }

//   render() {
//     // В проекте должен быть ваш собственный шаблонизатор
//     return `<div>${this.props.text}</div>`;
//   }
// }

// function render(query, block) {
//   const root = document.querySelector(query);
//   root.appendChild(block.getContent());
//   return root;
// }

// const button = new Button({
//   text: 'Click me',
// });

// // app — это class дива в корне DOM
// render('.app', button);

// // Через секунду контент изменится сам, достаточно обновить пропсы
// setTimeout(() => {
//   button.setProps({
//     text: 'Click me, please',
//   });
// }, 1000);
