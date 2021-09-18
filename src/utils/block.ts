/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import pug from 'pug';
import { v4 as makeUUID } from 'uuid';
import { EventBus } from './eventBus';

type Meta<P = any> = {
  tagName: string;
  props: P;
};

export default class Block<P = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  id = makeUUID();

  private readonly meta: Meta;

  protected privateElement: HTMLElement;

  protected readonly props: P;

  public eventBus: () => EventBus;

  constructor(tagName: string = 'div', props?: P) {
    const eventBus = new EventBus();
    this.meta = {
      tagName,
      props,
    };

    this.props = this.makePropsProxy(props || ({} as P));

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

    this.eventBus().emit(Block.EVENTS.FLOW_CDM, this.props);
  }

  private onComponentMount(props: P) {
    this.componentDidMount(props);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(oldProps: P) {}

  private onComponentUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.onRender();
  }

  componentDidUpdate(oldProps: P, newProps: P): boolean {
    return true;
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this.privateElement;
  }

  private addEvents() {
    const { events } = this.props as any;

    if (!events) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      this.privateElement.addEventListener(eventName, events[eventName]);
    });
  }

  private removeEvents() {
    const { events } = this.props as any;

    if (!events) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      this.privateElement.removeEventListener(eventName, events[eventName]);
    });
  }

  private onRender() {
    const fragment = this.render();

    this.removeEvents();

    this.privateElement.innerHTML = '';

    const { attrs } = this.props as any;
    if (attrs) {
      Object.keys(attrs).forEach((key) => {
        this.privateElement.setAttribute(key, attrs[key]);
      });
    }

    this.privateElement.append(fragment);

    this.addEvents();
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent(): HTMLElement {
    return this.element;
  }

  private makePropsProxy(props: P): P {
    const self = this;
    const oldProps = { ...props };
    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as unknown as P;
  }

  createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }
}
